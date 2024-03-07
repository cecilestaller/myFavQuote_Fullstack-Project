import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api";
import DashNav from "../../components/dash_nav/DashNav";
import picDummy from "./../../assets/img/picDummy.png";
import "./Profile.scss";
import { useState } from "react";
import backArrow from "./../../assets/img/backArrow.png";
import editPen from "./../../assets/img/editPen.png";
import Footer from "../../components/footer/Footer";

const Profile = ({ onLogout, authorization, userProfileInfo }) => {
    const navigate = useNavigate();
    const [edit, setEdit] = useState(false);
    const [profilePicUrl, setProfilePicUrl] = useState("");
    const [userName, setUserName] = useState("");
    const [errorMessage, setErrorMessage] = useState();

    async function editProfilePic(e) {
        e.preventDefault();

        const formData = new FormData();
        formData.append("image", profilePicUrl, profilePicUrl.filename);

        try {
            // upload new Pic and save filename in variable
            const fileResponse = await fetch(
                `${backendUrl}/api/v1/files/upload`,
                {
                    method: "POST",
                    body: formData,
                }
            );
            const fileResult = await fileResponse.json();
            const uploadedFilename = fileResult.result.filename;
            setProfilePicUrl(uploadedFilename);
            // edit Profile with new profilePic
            const response = await fetch(`${backendUrl}/api/v1/users/profile`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({ profilePicUrl: uploadedFilename }),
            });
            const { success, result, error, message } = await response.json();
            if (!success)
                setErrorMessage(
                    error.message ||
                        "ProfilePic upload failed, please try it later."
                );
            console.log(result);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    }

    async function editUserName(e) {
        e.preventDefault();

        try {
            const response = await fetch(`${backendUrl}/api/v1/users/profile`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json", authorization },
                body: JSON.stringify({ userName }),
            });
            const { success, result, error, message } = await response.json();
            if (!success)
                setErrorMessage(
                    error.message ||
                        "username update failed, please try it later."
                );
            console.log(result);
            window.location.reload();
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
                    My
                    <span className="brygada_it"> Profile</span>
                </h2>
                <section
                    className={
                        edit ? "profile_wrap profile_grid" : "profile_wrap"
                    }
                >
                    <section className="data_wrap">
                        <div className="pic_wrap">
                            <img
                                className="profilePic"
                                src={
                                    userProfileInfo?.profilePicUrl
                                        ? `${backendUrl}/download/${userProfileInfo.profilePicUrl}`
                                        : picDummy
                                }
                                alt={userProfileInfo?.userName}
                            />
                            <img
                                src={editPen}
                                alt="editPen"
                                className="editPen"
                                onClick={() => setEdit(!edit)}
                            />
                        </div>
                        <div className="info_wrap">
                            <h3>
                                Username:{" "}
                                <span className="brygada_it">
                                    {" "}
                                    {userProfileInfo?.userName}
                                </span>
                            </h3>
                        </div>
                    </section>
                    {edit && (
                        <section className="editForms_wrap">
                            <form className="form_wrap">
                                <div className="form_input">
                                    <label htmlFor="pic">
                                        You can upload a new Profile Picture
                                        here:{" "}
                                    </label>
                                    <input
                                        id="pic"
                                        type="file"
                                        onChange={(e) =>
                                            setProfilePicUrl(e.target.files[0])
                                        }
                                    />
                                </div>
                                <button
                                    className="btn"
                                    onClick={editProfilePic}
                                >
                                    Save
                                </button>
                            </form>

                            <form className="form_wrap">
                                <div className="form_input">
                                    <label htmlFor="userName">
                                        New Username:{" "}
                                    </label>
                                    <input
                                        type="text"
                                        name="userName"
                                        id="userName"
                                        value={userName}
                                        onChange={(e) => {
                                            setUserName(e.target.value);
                                        }}
                                    />
                                </div>
                                <button className="btn" onClick={editUserName}>
                                    Save
                                </button>
                            </form>
                        </section>
                    )}
                    {errorMessage && (
                        <p style={{ color: "red" }}>{errorMessage}</p>
                    )}
                </section>
            </section>
            <Footer />
        </>
    );
};

export default Profile;
