import { Link, useParams } from "react-router-dom";
import DashNav from "../../components/dash_nav/DashNav";
import "./Dashboard.scss";
import Footer from "../../components/footer/Footer";

const Dashboard = ({ authorization, userProfileInfo, onLogout }) => {
    return (
        <>
            <DashNav onLogout={onLogout} userProfileInfo={userProfileInfo} />
            <main className="content_wrapper">
                <h2 className="main_hl">
                    Hello{" "}
                    <span className="brygada_it">
                        {userProfileInfo?.userName}
                    </span>
                </h2>
                <h3>What do you want to do?</h3>
                <article className="menu_wrap">
                    <Link to="/overview">
                        <div className="menuBox getAll">
                            <h3>VIEW ALL QUOTES</h3>
                        </div>
                    </Link>
                    <Link to="/add-new-quote">
                        <div className="menuBox addQuote">
                            <h3>ADD NEW QUOTE</h3>
                        </div>
                    </Link>
                    <Link to="/authorlist">
                        <div className="menuBox authorList">
                            <h3>AUTHOR-LIST</h3>
                        </div>
                    </Link>
                    <Link to="/favorites">
                        <div className="menuBox favQuotes">
                            <h3>MY FAVORITES ♥️</h3>
                        </div>
                    </Link>
                </article>
            </main>
            <Footer />
        </>
    );
};

export default Dashboard;
