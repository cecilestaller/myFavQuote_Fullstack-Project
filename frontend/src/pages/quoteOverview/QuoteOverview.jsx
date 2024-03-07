import { useEffect, useState } from "react";
import DashNav from "../../components/dash_nav/DashNav";
import { backendUrl } from "../../api/index.js";
import QuoteCard from "../../components/quoteCard/QuoteCard";
import "./QuoteOverview.scss";
import { useNavigate } from "react-router-dom";
import backArrow from "./../../assets/img/backArrow.png";
import Footer from "../../components/footer/Footer";

const QuoteOverview = ({ authorization, userProfileInfo, onLogout }) => {
    const navigate = useNavigate();

    const [allQuotes, setAllQuotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchAllQuotes() {
            try {
                const response = await fetch(backendUrl + "/api/v1/quotes", {
                    headers: { authorization },
                });
                const { success, result, error } = await response.json();
                if (!success)
                    setErrorMessage(
                        error.message ||
                            "You have no Quotes added yet, please add Quotes first"
                    );
                return setAllQuotes(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllQuotes();
    }, []);

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
                    <span className="brygada_it"> Overview</span>
                </h2>
                <h3>Total Amount of Quotes yet: {allQuotes?.length}</h3>
                <section className="quoteCard_wrap">
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        allQuotes?.length > 0 &&
                        allQuotes.map((quote) => (
                            <QuoteCard
                                quote={quote}
                                key={quote._id}
                                authorization={authorization}
                            />
                        ))
                    )}
                </section>
            </section>
            <Footer />
        </>
    );
};

export default QuoteOverview;
