import { useNavigate, useParams } from "react-router-dom";
import DashNav from "../../components/dash_nav/DashNav";
import { useEffect, useState } from "react";
import { backendUrl } from "../../api";
import picDummy from "./../../assets/img/picDummy.png";
import "./AuthorDetails.scss";
import QuoteCard from "../../components/quoteCard/QuoteCard";
import backArrow from "./../../assets/img/backArrow.png";
import editPen from "./../../assets/img/editPen.png";
import Footer from "../../components/footer/Footer";
import trash from "./../../assets/img/trash.png";

const AuthorDetails = ({ onLogout, authorization, userProfileInfo }) => {
    const { authorId } = useParams();
    const [allAuthorQuotes, setAllAuthorQuotes] = useState([]);
    const [author, setAuthor] = useState(null);
    const [errorMessage, setErrorMessage] = useState();
    const [edit, setEdit] = useState(false);
    const [authorPicUrl, setAuthorPicUrl] = useState("");
    const [role, setRole] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllQuotesOfAuthor() {
            try {
                const response = await fetch(
                    `${backendUrl}/api/v1/quotes/authorQuotes/${authorId}`,
                    {
                        headers: {
                            authorization,
                        },
                    }
                );
                const { success, result, error } = await response.json();
                if (!success) return setErrorMessage("Loading Quotes failed");
                setAuthor(result.author);
                setAllAuthorQuotes(result.quotes);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllQuotesOfAuthor();
    }, []);

    function editAuthorPic(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", authorPicUrl, authorPicUrl.filename);

        fetch(`${backendUrl}/api/v1/files/upload`, {
            method: "POST",
            body: formData,
        })
            .then((res) => res.json())
            .then(({ success, result, error, message }) => {
                if (success) return result.filename;
                else {
                    console.log({ message });
                    throw error; // jump to catch
                }
            })
            .then((uploadedFilename) =>
                fetch(`${backendUrl}/api/v1/authors/editAuthor/${authorId}`, {
                    method: "PATCH",
                    headers: {
                        authorization,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ authorPicUrl: uploadedFilename }),
                })
                    .then((res) => res.json())
                    .then(({ success, result, error, message }) => {
                        console.log({ success, result, error, message });
                        window.location.reload();
                    })
                    .catch((error) => console.log(error))
            );
    }

    async function editAuthorRole(e) {
        e.preventDefault();

        try {
            const response = await fetch(
                `${backendUrl}/api/v1/authors/editAuthor/${authorId}`,
                {
                    method: "PATCH",
                    headers: {
                        authorization,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ role }),
                }
            );
            const { success, result, error } = await response.json();
            if (!success) setErrorMessage("Could not Update author role...");
            console.log(result);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function deleteAuthorAndQuotes() {
        try {
            const response = await fetch(
                `${backendUrl}/api/v1/authors/${authorId}`,
                {
                    method: "DELETE",
                    headers: { authorization },
                }
            );
            const { success, result, error } = await response.json();
            navigate("/authorlist");
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
                    Details about
                    <span className="brygada_it"> {author?.authorName}</span>
                </h2>
                <article>
                    <article className="authorCard_wrap">
                        <img
                            className="authorPic"
                            src={
                                author?.authorPicUrl
                                    ? `${backendUrl}/download/${author.authorPicUrl}`
                                    : picDummy
                            }
                            alt={author?.authorName}
                        />
                        <div>
                            <div className="innerBox">
                                <h3>{author?.authorName}</h3>
                                <img
                                    src={editPen}
                                    alt="editPen"
                                    className="editPen"
                                    onClick={() => setEdit(!edit)}
                                />
                            </div>
                            <p>Role: {author?.role}</p>
                            <p>Amount of Quotes: {allAuthorQuotes?.length}</p>
                        </div>
                    </article>

                    {edit && (
                        <section className="editForms_wrap">
                            <form className="form_wrap">
                                <div className="form_input">
                                    <label htmlFor="pic">
                                        You can upload a Picture of the Author
                                        here:{" "}
                                    </label>
                                    <input
                                        id="pic"
                                        type="file"
                                        onChange={(e) =>
                                            setAuthorPicUrl(e.target.files[0])
                                        }
                                    />
                                </div>
                                <button className="btn" onClick={editAuthorPic}>
                                    Save Picture
                                </button>
                            </form>

                            <form className="form_wrap">
                                <div className="form_input">
                                    <label htmlFor="role">
                                        Select Author-Role:{" "}
                                    </label>
                                    <select
                                        name="role"
                                        id="role"
                                        value={role}
                                        onChange={(e) =>
                                            setRole(e.target.value)
                                        }
                                    >
                                        <option value="" disabled>
                                            Select Author-Role
                                        </option>
                                        <option value="Family">Family</option>
                                        <option value="Friends">Friends</option>
                                        <option value="Work">Work</option>
                                        <option value="Others">Others</option>
                                    </select>
                                </div>
                                <button
                                    className="btn"
                                    onClick={editAuthorRole}
                                >
                                    Save Role
                                </button>
                            </form>

                            <button
                                className="btn delete"
                                onClick={deleteAuthorAndQuotes}
                            >
                                Delete Author
                            </button>
                            <p style={{ color: "red" }}>
                                *By deleting the Author you also delete all
                                their Quotes
                            </p>
                        </section>
                    )}

                    <section className="quoteCard_wrap">
                        {errorMessage ? (
                            <p>{errorMessage}</p>
                        ) : (
                            allAuthorQuotes &&
                            allAuthorQuotes.map((quote) => (
                                <QuoteCard
                                    quote={quote}
                                    key={quote._id}
                                    authorization={authorization}
                                />
                            ))
                        )}
                    </section>
                </article>
            </section>
            <Footer />
        </>
    );
};

export default AuthorDetails;
