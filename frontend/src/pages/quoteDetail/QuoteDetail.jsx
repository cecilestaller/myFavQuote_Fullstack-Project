import { useNavigate, useParams } from "react-router-dom";
import DashNav from "../../components/dash_nav/DashNav";
import Footer from "../../components/footer/Footer";
import backArrow from "./../../assets/img/backArrow.png";
import editPen from "./../../assets/img/editPen.png";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import QuoteCard from "../../components/quoteCard/QuoteCard";
import AuthorCard from "../../components/authorCard/AuthorCard";
import picDummy from "./../../assets/img/picDummy.png";
import "./QuoteDetail.scss";

const QuoteDetail = ({ onLogout, authorization, userProfileInfo }) => {
    const { quoteId } = useParams();
    const [quoteDetails, setQuoteDetails] = useState({});
    const [authorInfo, setAuthorInfo] = useState({});
    const [quoteText, setQuoteText] = useState("");
    const [context, setContext] = useState("");
    const [errorMessage, setErrorMessage] = useState();
    const [edit, setEdit] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchQuoteDetails() {
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/quotes/details/${quoteId}`,
                    {
                        headers: {
                            authorization,
                        },
                    }
                );
                const { success, result, error } = await response.json();
                if (!success) return setErrorMessage("Loading Details failed");
                console.log(result);
                setQuoteDetails(result.quoteDetails);
                setAuthorInfo(result.authorDetails);
            } catch (error) {
                console.log(error);
            }
        }
        fetchQuoteDetails();
    }, []);

    async function editQuote(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/quotes/edit/${quoteId}`,
                {
                    method: "PATCH",
                    headers: {
                        authorization,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ quoteText, context }),
                }
            );
            const { success, result, error } = await response.json();
            if (!success) setErrorMessage("Could not update quote");
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    console.log("Hi", quoteDetails);
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
                    Quote
                    <span className="brygada_it"> Details</span>
                </h2>
                <h3>
                    Made a typo while adding a new Quote? No Problem! You can
                    edit your Quote here.{" "}
                </h3>
                <section className="editQuote">
                    {quoteDetails && (
                        <article className="quote_wrap">
                            <p className="quote_text">
                                "{quoteDetails?.quoteText}"
                            </p>
                            <h4 className="author">{quoteDetails?.author}</h4>
                            <p className="quote_info">
                                {quoteDetails?.context}
                            </p>
                            <div>
                                <img
                                    src={editPen}
                                    alt="editPen"
                                    className="editPen"
                                    onClick={() => setEdit(!edit)}
                                />
                            </div>
                        </article>
                    )}

                    <p>{errorMessage}</p>
                </section>
                {edit && (
                    <section className="editForms_wrap">
                        <form className="form_wrap">
                            <div className="form_input">
                                <label htmlFor="content">What was said?</label>
                                <textarea
                                    name="content"
                                    placeholder="Quote..."
                                    id="content"
                                    cols="30"
                                    rows="10"
                                    value={quoteText}
                                    onChange={(e) =>
                                        setQuoteText(e.target.value)
                                    }
                                ></textarea>
                            </div>
                            <div className="form_input">
                                <label htmlFor="context">
                                    Any context needed?{" "}
                                </label>
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
                            <button className="btn" onClick={editQuote}>
                                Save
                            </button>
                        </form>
                    </section>
                )}
                <section className="author_wrapper">
                    <h3>Author:</h3>
                    <AuthorCard
                        author={authorInfo}
                        imgUrl={
                            authorInfo?.authorPicUrl
                                ? `${backendUrl}/download/${authorInfo.authorPicUrl}`
                                : picDummy
                        }
                    />
                </section>
            </section>
            <Footer />
        </>
    );
};

export default QuoteDetail;
