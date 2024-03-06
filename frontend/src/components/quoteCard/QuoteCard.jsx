import { Link } from "react-router-dom";
import "./QuoteCard.scss";
import { useState } from "react";
import { backendUrl } from "../../api";
import emptyHeart from "./../../assets/img/emptyHeart.png";
import filledHeart from "./../../assets/img/filledHeart.png";
import trash from "./../../assets/img/trash.png";

const QuoteCard = ({ quote, authorization }) => {
    const [singleQuote, setSingleQuote] = useState(quote);

    async function toggleFavQuote() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/quotes/toggleFav/${quote._id}`,
                {
                    method: "PATCH",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            setSingleQuote(result);
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteQuote() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/quotes/${quote._id}`,
                {
                    method: "DELETE",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    console.log(singleQuote);
    return (
        <>
            <Link>
                <article className="quote_wrap">
                    <p className="quote_text">"{singleQuote?.quoteText}"</p>
                    <h4 className="author">{singleQuote?.author}</h4>
                    <p className="quote_info">{singleQuote?.context}</p>
                    <div>
                        <img
                            className="delete"
                            onClick={deleteQuote}
                            src={trash}
                            alt="trashCan"
                        />
                        <div className="favorite" onClick={toggleFavQuote}>
                            {singleQuote?.isFavorite ? (
                                <img
                                    className="heart"
                                    src={filledHeart}
                                    alt="filledHeart"
                                />
                            ) : (
                                <img
                                    className="heart"
                                    src={emptyHeart}
                                    alt="emptyHeart"
                                />
                            )}
                        </div>
                    </div>
                </article>
            </Link>
        </>
    );
};

export default QuoteCard;
