import { useEffect, useState } from "react";
import DashNav from "../../components/dash_nav/DashNav";
import picDummy from "./../../assets/img/picDummy.png";
import { backendUrl } from "../../api";
import AuthorCard from "../../components/authorCard/AuthorCard";
import "./AuthorList.scss";
import { useNavigate } from "react-router-dom";
import backArrow from "./../../assets/img/backArrow.png";
import Footer from "../../components/footer/Footer";

const AuthorList = ({ onLogout, authorization, userProfileInfo }) => {
    const [allAuthors, setAllAuthors] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchAllAuthors() {
            try {
                const response = await fetch(backendUrl + "/api/v1/authors", {
                    headers: { authorization },
                });
                const { success, result, error } = await response.json();
                if (!success)
                    setErrorMessage(
                        "Something went wrong with loading your Authors"
                    );
                return setAllAuthors(result);
            } catch (error) {
                console.log(error);
            }
        }
        fetchAllAuthors();
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
                    All my <span className="brygada_it">Authors</span>
                </h2>
                <h3>Select an Author and you can see all of their Quotes</h3>
                <section className="authorCards_wrapper">
                    {errorMessage ? (
                        <p>{errorMessage}</p>
                    ) : (
                        allAuthors &&
                        allAuthors.map((author) => (
                            <AuthorCard
                                author={author}
                                key={author._id}
                                imgUrl={
                                    author.authorPicUrl
                                        ? `${backendUrl}/download/${author.authorPicUrl}`
                                        : picDummy
                                }
                            />
                        ))
                    )}
                </section>
            </section>
            <Footer />
        </>
    );
};

export default AuthorList;
