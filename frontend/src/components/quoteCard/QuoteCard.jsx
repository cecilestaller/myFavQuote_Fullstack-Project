import { Link } from "react-router-dom";
import "./QuoteCard.scss";
import { useState } from "react";
import { backendUrl } from "../../api";

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
                        <p className="delete" onClick={deleteQuote}>
                            🗑️
                        </p>
                        <div className="favorite" onClick={toggleFavQuote}>
                            {singleQuote?.isFavorite ? <p>♥️</p> : <p>🤍</p>}
                        </div>
                    </div>
                </article>
            </Link>
        </>
    );
};

export default QuoteCard;
