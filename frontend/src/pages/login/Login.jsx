import Nav from "../../components/nav/Nav";
import { backendUrl } from "../../api/index.js";
import { useState } from "react";
import { silentRefreshLoop } from "../../utils/tokens.js";
import { Link } from "react-router-dom";

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [userInfo, setUserInfo] = useState(null);

    async function loginUser(e) {
        e.preventDefault();

        if (!email || !password) {
            setErrorMessage("Please enter your Email and Password");
            return;
        }

        try {
            const response = await fetch(`${backendUrl}/api/v1/users/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
                credentials: "include",
            });
            const { success, result, message } = await response.json();

            if (!success) {
                console.log(message);
                return setErrorMessage(message || "Login failed");
            }
            const authorization = `Bearer ${result.tokens.accessToken}`;
            onLoginSuccess(authorization, result.user);
            console.log(result);
            silentRefreshLoop(
                result.tokens.accessToken,
                function onSilentRefreshCallback(newAccessToken) {
                    const authorization = `Bearer ${newAccessToken}`;
                    onLoginSuccess(authorization, result.user);
                }
            );
            setErrorMessage("");
            setSuccessMessage(
                "Login successful 🥳, got to the Dashboard and start creating your first Quotes!"
            );
            setUserInfo(result.user);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <Nav />
            <section className="content_wrapper">
                <h2 className="main_hl">
                    Login to your <span className="brygada_it">Account</span>
                </h2>
                {successMessage ? (
                    <section>
                        <p style={{ color: "green" }}>{successMessage}</p>

                        <Link to={`/dashboard`}>
                            <button className="btn">My Dashboard</button>
                        </Link>
                    </section>
                ) : (
                    <section>
                        <form className="form_wrap">
                            <div className="form_input">
                                <label htmlFor="email">
                                    Email{" "}
                                    <span className="required_star">*</span>
                                </label>
                                <input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                            <div className="form_input">
                                <label htmlFor="password">
                                    Password{" "}
                                    <span className="required_star">*</span>
                                </label>
                                <input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button className="btn" onClick={loginUser}>
                                LogIn
                            </button>
                        </form>
                        <p style={{ color: "red" }}>{errorMessage}</p>
                        <p>Not registered yet? Please create an Account here</p>
                        <Link to="/register">
                            <button className="btn">Create an Account</button>
                        </Link>
                    </section>
                )}
            </section>
        </>
    );
};

export default Login;
