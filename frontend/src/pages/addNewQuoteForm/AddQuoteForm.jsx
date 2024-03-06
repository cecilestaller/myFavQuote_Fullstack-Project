import { useState } from "react";
import DashNav from "../../components/dash_nav/DashNav";
import { backendUrl } from "../../api";
import { useNavigate } from "react-router-dom";
import backArrow from "./../../assets/img/backArrow.png";

const AddQuoteForm = ({ authorization, userProfileInfo, onLogout }) => {
    const [quoteText, setQuoteText] = useState("");
    const [author, setAuthor] = useState("");
    const [saidAt, setSaidAt] = useState("");
    const [context, setContext] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();

    async function addQuote(e) {
        e.preventDefault();

        if (!quoteText || !author) {
            setErrorMessage(
                "Quote Text and author must be provided in Order to add a valid Quote."
            );
            return;
        }

        try {
            const response = await fetch(backendUrl + "/api/v1/quotes", {
                method: "POST",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({ quoteText, author, context, saidAt }),
            });
            const { success, result, error } = await response.json();
            console.log(result);
            setErrorMessage("");
            setSuccessMessage("Quote added successfully :)");
            setQuoteText("");
            setAuthor("");
            setContext("");
            setSaidAt("");
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <>
            <DashNav onLogout={onLogout} userProfileInfo={userProfileInfo} />
            <section className="content_wrapper">
                <img
                    className="back"
                    onClick={() => navigate(-1)}
                    src={backArrow}
                    alt="backArrow"
                />
                <h2 className="main_hl">
                    Add a new <span className="brygada_it">Quote</span>
                </h2>
                <h3>
                    Someone said something hilarious? Make sure you never forget
                    it again and record it here for eternity!{" "}
                </h3>
                <form className="form_wrap">
                    <div className="form_input">
                        <label htmlFor="content">
                            What was said?{" "}
                            <span className="required_star">*</span>
                        </label>
                        <textarea
                            name="content"
                            placeholder="Quote..."
                            id="content"
                            required
                            cols="30"
                            rows="10"
                            value={quoteText}
                            onChange={(e) => setQuoteText(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form_input">
                        <label htmlFor="author">
                            Who said it?{" "}
                            <span className="required_star">*</span>
                        </label>
                        <input
                            id="author"
                            placeholder="Author..."
                            type="text"
                            required
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                        />
                    </div>
                    <div className="form_input">
                        <label htmlFor="context">Any context needed? </label>
                        <textarea
                            name="context"
                            placeholder="Context..."
                            id="context"
                            cols="30"
                            rows="4"
                            value={context}
                            onChange={(e) => setContext(e.target.value)}
                        ></textarea>
                    </div>
                    <div className="form_input">
                        <label htmlFor="date">When was it said? </label>
                        <input
                            id="date"
                            type="date"
                            required
                            value={saidAt}
                            onChange={(e) => setSaidAt(e.target.value)}
                        />
                    </div>
                    <button className="btn" onClick={addQuote}>
                        Submit
                    </button>
                </form>
                <p style={{ color: "red" }}>{errorMessage}</p>
                <p style={{ color: "green" }}>{successMessage}</p>
            </section>
        </>
    );
};

export default AddQuoteForm;
