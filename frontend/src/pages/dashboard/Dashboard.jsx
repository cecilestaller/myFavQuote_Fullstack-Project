import { Link } from "react-router-dom";
import DashNav from "../../components/dash_nav/DashNav";
import "./Dashboard.scss";

const Dashboard = () => {
    return (
        <>
            <DashNav />
            <main className="content_wrapper">
                <h2 className="main_hl">
                    Hello <span className="brygada_it">Cecile</span>
                </h2>
                <article className="menu_wrap">
                    <h3>What do you want to do?</h3>
                    <Link>
                        <div className="menuBox getAll">
                            <h3>VIEW ALL QUOTES</h3>
                        </div>
                    </Link>
                </article>
            </main>
        </>
    );
};

export default Dashboard;
