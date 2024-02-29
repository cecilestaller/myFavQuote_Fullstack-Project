import { NavLink } from "react-router-dom";
import "./DashNav.scss";
import picDummy from "./../../assets/img/picDummy.png";

const DashNav = () => {
    return (
        <nav>
            <NavLink>
                <h1>myFavQuotes</h1>
            </NavLink>

            <div className="nav_list">
                <NavLink>Logout</NavLink>
                <NavLink>
                    <img className="profilePic_circle" src={picDummy} alt="" />
                    <p>My Profile</p>
                </NavLink>
            </div>
        </nav>
    );
};

export default DashNav;
