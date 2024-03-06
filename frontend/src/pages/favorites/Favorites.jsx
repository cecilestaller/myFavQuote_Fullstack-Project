import { useNavigate } from "react-router-dom";
import DashNav from "../../components/dash_nav/DashNav";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import QuoteCard from "../../components/quoteCard/QuoteCard";
import backArrow from "./../../assets/img/backArrow.png";

const Favorites = ({ authorization, userProfileInfo, onLogout }) => {
    const navigate = useNavigate();
    const [allFavQuotes, setAllFavQuotes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        async function fetchAllFavorites() {
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/quotes/favorites`,
                    {
                        headers: { authorization },
                    }
                );
                const { success, result, error, message } =
                    await response.json();
                if (!success) setErrorMessage(error.message);
                return setAllFavQuotes(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllFavorites();
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
                    Quotes marked as
                    <span className="brygada_it"> Favorites</span>
                </h2>
                <h3>Total Amount of Favorite Quotes: {allFavQuotes?.length}</h3>
                <section className="quoteCard_wrap">
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        allFavQuotes?.length > 0 &&
                        allFavQuotes.map((quote) => (
                            <QuoteCard
                                quote={quote}
                                key={quote._id}
                                authorization={authorization}
                            />
                        ))
                    )}
                </section>
            </section>
        </>
    );
};

export default Favorites;
