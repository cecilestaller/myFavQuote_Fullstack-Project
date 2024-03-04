import { NavLink } from "react-router-dom";
import "./DashNav.scss";
import picDummy from "./../../assets/img/picDummy.png";
import LogoutBtn from "../LogoutBtn";

const DashNav = ({ onLogout }) => {
    return (
        <nav>
            <NavLink to={"/dashboard"}>
                <h1>myFavQuotes</h1>
            </NavLink>

            <div className="nav_list">
                <NavLink>
                    <LogoutBtn onLogout={onLogout} />
                </NavLink>
                <NavLink>
                    <img className="profilePic_circle" src={picDummy} alt="" />
                    <p>My Profile</p>
                </NavLink>
            </div>
        </nav>
    );
};

export default DashNav;
