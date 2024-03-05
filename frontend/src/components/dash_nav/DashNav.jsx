import { NavLink } from "react-router-dom";
import "./DashNav.scss";
import picDummy from "./../../assets/img/picDummy.png";
import LogoutBtn from "../LogoutBtn";
import { backendUrl } from "../../api";

const DashNav = ({ onLogout, userProfileInfo }) => {
    // console.log(userProfileInfo);
    return (
        <nav>
            <NavLink to={"/dashboard"}>
                <h1>myFavQuotes</h1>
            </NavLink>

            <div className="nav_list">
                <NavLink>
                    <LogoutBtn onLogout={onLogout} />
                </NavLink>
                <NavLink to={"/my-profile"}>
                    <img
                        className="profilePic_circle"
                        src={
                            userProfileInfo?.profilePicUrl
                                ? `${backendUrl}/download/${userProfileInfo.profilePicUrl}`
                                : picDummy
                        }
                        alt=""
                    />
                    <p>My Profile</p>
                </NavLink>
            </div>
        </nav>
    );
};

export default DashNav;
