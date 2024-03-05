import { backendUrl } from "../../api";
import DashNav from "../../components/dash_nav/DashNav";
import picDummy from "./../../assets/img/picDummy.png";

const Profile = ({ onLogout, authorization, userProfileInfo }) => {
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
                    <img
                        src={
                            userProfileInfo?.profilePicUrl
                                ? `${backendUrl}/download/${userProfileInfo.profilePicUrl}`
                                : picDummy
                        }
                        alt={userProfileInfo?.userName}
                    />
                </section>
            </section>
        </>
    );
};

export default Profile;
