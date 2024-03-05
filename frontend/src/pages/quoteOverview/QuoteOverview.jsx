import { useEffect, useState } from "react";
import DashNav from "../../components/dash_nav/DashNav";
import { backendUrl } from "../../api/index.js";
import QuoteCard from "../../components/quoteCard/QuoteCard";
import "./QuoteOverview.scss";
import { useNavigate } from "react-router-dom";

const QuoteOverview = ({ authorization, userProfileInfo, onLogout }) => {
    // console.log(userProfileInfo);
    // console.log(authorization);
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
                        "Something went wrong with loading your Quotes"
                    );
                return setAllQuotes(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllQuotes();
    }, []);
    console.log(allQuotes);
    return (
        <>
            <DashNav onLogout={onLogout} userProfileInfo={userProfileInfo} />
            <section className="content_wrapper">
                <h4 className="back" onClick={() => navigate(-1)}>
                    {" "}
                    ◁ Back
                </h4>
                <h2 className="main_hl">
                    Quote
                    <span className="brygada_it"> Overview</span>
                </h2>

                <section className="quoteCard_wrap">
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        allQuotes &&
                        allQuotes.map((quote) => (
                            <QuoteCard quote={quote} key={quote._id} />
                        ))
                    )}
                </section>
            </section>
        </>
    );
};

export default QuoteOverview;
