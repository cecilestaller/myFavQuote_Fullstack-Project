import { useState } from "react";
import "./Register.scss";
import Nav from "../../components/nav/Nav";
import { Link } from "react-router-dom";
import { backendUrl } from "../../api/index.js";

const Register = () => {
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    async function registerNewUser(e) {
        e.preventDefault();

        if (!userName || !email || !password || !confirmPassword) {
            setErrorMessage("Please fill all fields with correct information");
            return;
        }
        if (!email.includes("@")) {
            setErrorMessage("Please enter valid email");
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage("Please enter matching passwords in both fields");
            return;
        }

        try {
            const response = await fetch(
                `${backendUrl}/api/v1/users/register`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userName, email, password }),
                }
            );
            const { success, result, error, message } = await response.json();

            if (!success)
                return setErrorMessage(message || "Registration failed");
            setErrorMessage(""); // success --> reset errorMessage
            setSuccessMessage(
                "Registration successful, we sent you an email with a six-digit-verification-code. Please check your inbox and click 'Verify my Email' to enter the Code"
            );
        } catch (error) {
            console.log(error);
            setErrorMessage(
                error.message || "Registration failed, please try again"
            );
        }
    }

    return (
        <>
            <Nav />
            <section className="content_wrapper">
                <h2 className="main_hl">
                    Create New <span className="brygada_it">Account</span>
                </h2>

                <p style={{ color: "green" }}>{successMessage}</p>
                {successMessage ? (
                    <Link to="/verify-email">
                        <button className="btn">Verify my Email</button>
                    </Link>
                ) : (
                    <section>
                        <form className="form_wrap">
                            <div className="form_input">
                                <label htmlFor="name">
                                    Username{" "}
                                    <span className="required_star">*</span>
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    value={userName}
                                    onChange={(e) =>
                                        setUserName(e.target.value)
                                    }
                                />
                            </div>
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
                            <div className="form_input">
                                <label htmlFor="password-confirm">
                                    Confirm Password{" "}
                                    <span className="required_star">*</span>
                                </label>
                                <input
                                    id="password-confirm"
                                    type="password"
                                    value={confirmPassword}
                                    onChange={(e) =>
                                        setConfirmPassword(e.target.value)
                                    }
                                />
                            </div>
                            <button className="btn" onClick={registerNewUser}>
                                REGISTER
                            </button>
                        </form>
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    </section>
                )}
            </section>
        </>
    );
};

export default Register;
