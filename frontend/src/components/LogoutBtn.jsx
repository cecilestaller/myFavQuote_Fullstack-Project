import { useNavigate } from "react-router-dom";
import { backendUrl } from "../api";
import "./LogoutBtn.scss";

const LogoutBtn = ({ onLogout }) => {
    const navigate = useNavigate();

    async function doLogout() {
        const response = await fetch(backendUrl + "/api/v1/users/logout", {
            method: "POST",
            credentials: "include",
        });
        const { success } = await response.json();
        if (!success) alert("Could not logout");
        onLogout(); // reset local authorization state (with token inside)
        navigate("/");
    }
    return (
        <button
            className="btn logout_btn"
            // style={{ backgroundColor: "#ecb159" }}
            onClick={doLogout}
        >
            Logout
        </button>
    );
};

export default LogoutBtn;
