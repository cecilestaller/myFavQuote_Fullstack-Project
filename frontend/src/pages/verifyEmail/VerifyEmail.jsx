import { useState } from "react";
import Nav from "../../components/nav/Nav";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import { backendUrl } from "../../api/index";

const VerifyEmail = () => {
    const [sixDigitCode, setSixDigitCode] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");

    const { userId } = useParams();

    async function verifyEmail(e) {
        e.preventDefault();

        if (!sixDigitCode || sixDigitCode.length < 6) {
            setErrorMessage(
                "Please enter your six-digit code, we have sent you as email"
            );
            return;
        }

        try {
            const response = await fetch(
                `${backendUrl}/api/v1/users/verifyEmail`,
                {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ userId, sixDigitCode }),
                }
            );
            const { success, result, error, message } = await response.json();
            if (!success) {
                throw error;
            }
            console.log({ result });
            setSuccessMessage(
                "Verifications successful, You can now login to your account."
            );
        } catch (error) {
            console.log(error);
            setErrorMessage(error.message || "Email Verification failed");
        }
    }

    return (
        <>
            <Nav />
            <section className="content_wrapper">
                <h2 className="main_hl">
                    Verify your <span className="brygada_it">Email</span>
                </h2>

                {successMessage ? (
                    <section>
                        <p style={{ color: "green" }}>{successMessage}</p>
                        <Link to="/login">
                            <button className="btn">Login</button>
                        </Link>
                    </section>
                ) : (
                    <section>
                        <p>
                            Almost done, your Account was created successfully
                            🥳, please enter the 6-digit code we sent to your
                            email to enable your Login
                        </p>

                        <form className="form_wrap">
                            <div className="form_input">
                                <label htmlFor="sixDigitCode">
                                    Enter 6-digit verifcation code:
                                </label>
                                <input
                                    id="sixDigitCode"
                                    type="text"
                                    value={sixDigitCode}
                                    onChange={(e) =>
                                        setSixDigitCode(e.target.value)
                                    }
                                />
                            </div>

                            <button className="btn" onClick={verifyEmail}>
                                Submit
                            </button>
                        </form>
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    </section>
                )}
            </section>
        </>
    );
};

export default VerifyEmail;
