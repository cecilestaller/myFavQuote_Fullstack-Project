import { Link } from "react-router-dom";
import "./AuthorCard.scss";

const AuthorCard = ({ author, imgUrl }) => {
    return (
        <>
            <Link to={`/author-details/${author._id}`}>
                <article className="authorCard_wrap">
                    <img className="authorPic" src={imgUrl} alt="" />
                    <div>
                        <h3>{author.authorName}</h3>
                        <p>Role: {author.role}</p>
                    </div>
                </article>
            </Link>
        </>
    );
};

export default AuthorCard;
