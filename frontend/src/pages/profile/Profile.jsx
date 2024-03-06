import { useNavigate } from "react-router-dom";
import { backendUrl } from "../../api";
import DashNav from "../../components/dash_nav/DashNav";
import picDummy from "./../../assets/img/picDummy.png";
import "./Profile.scss";

const Profile = ({ onLogout, authorization, userProfileInfo }) => {
    const navigate = useNavigate();
    return (
        <>
            <DashNav onLogout={onLogout} userProfileInfo={userProfileInfo} />
            <section className="content_wrapper">
                <h4 className="back" onClick={() => navigate(-1)}>
                    {" "}
                    ◁ Back
                </h4>
                <h2 className="main_hl">
                    My
                    <span className="brygada_it"> Profile</span>
                </h2>
                <section className="profile_wrap">
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
                        <p className="editPen">✎</p>
                    </div>
                    <div className="info_wrap">
                        <h3>
                            Username:{" "}
                            <span className="brygada_it">
                                {" "}
                                {userProfileInfo?.userName}
                            </span>
                        </h3>
                        <p className="editPen">✎</p>
                    </div>
                </section>
            </section>
        </>
    );
};

export default Profile;
