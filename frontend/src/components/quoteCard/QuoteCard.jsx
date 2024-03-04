import { Link } from "react-router-dom";
import "./QuoteCard.scss";

const QuoteCard = ({ quote }) => {
    return (
        <>
            <Link to={`/quote-details/${quote.id}`}>
                <article className="quote_wrap">
                    <p className="quote_text">"{quote.quoteText}"</p>
                    <h4 className="author">{quote.author}</h4>
                    <p className="quote_info">{quote.context}</p>
                </article>
            </Link>
        </>
    );
};

export default QuoteCard;
