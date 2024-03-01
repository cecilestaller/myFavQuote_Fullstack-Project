import { NavLink } from "react-router-dom";
import "./Nav.scss";

const Nav = () => {
    return (
        <nav>
            <NavLink>
                <h1>myFavQuotes</h1>
            </NavLink>

            <div className="nav_list">
                <NavLink to="/register">SignUp</NavLink>
                <NavLink>LogIn</NavLink>
            </div>
        </nav>
    );
};

export default Nav;
