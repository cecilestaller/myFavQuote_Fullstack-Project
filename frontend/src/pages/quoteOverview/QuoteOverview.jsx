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
    const [sortBy, setSortBy] = useState("");
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

    useEffect(() => {
        const sortQuotes = () => {
            if (sortBy === "New") {
                const latestAddedFirst = [...allQuotes].sort(
                    (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
                );
                setAllQuotes(latestAddedFirst);
                console.log("Newest: ", latestAddedFirst);
            } else if (sortBy === "Old") {
                const latestAddedFirst = [...allQuotes].sort(
                    (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
                );
                setAllQuotes(latestAddedFirst);
            }
        };
        sortQuotes();
    }, [sortBy]);

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
                <form className="sort_wrap">
                    <div className="form_input">
                        <label htmlFor="sort">Sort Quotes: </label>
                        <select
                            name="sort"
                            id="sort"
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            <option value="">Select</option>
                            <option value="New">latest added first</option>
                            <option value="Old">oldest first</option>
                        </select>
                    </div>
                </form>
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
