import copyright from "./../../assets/img/copyright.png";
import "./Footer.scss";

const Footer = () => {
    return (
        <footer>
            <div className="logo">
                <img className="copy" src={copyright} alt="copyright" />
                <h2 className="logo_text">myFavQuotes</h2>
            </div>

            <p>
                All Icons from{" "}
                <a target="_blank" className="icon" href="https://icons8.com">
                    Icons8
                </a>
            </p>
        </footer>
    );
};

export default Footer;
