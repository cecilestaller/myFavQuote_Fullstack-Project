import NinjaQuote from "../../components/NinjaQuote";
import Nav from "../../components/nav/Nav";
import "./Home.scss";

const Home = () => {
    return (
        <>
            <Nav />
            <main className="content_wrapper">
                <h2 className="main_hl">
                    Welcome to <span className="brygada_it">myFavQuotes</span>
                </h2>
                <h3>
                    The App that helps you remember EVERYTHING colleagues, loved
                    Ones or friends said
                </h3>
                <p>
                    Everybody likes to quote famous people, but people close to
                    you also have a lot to say what's worth remembering!
                </p>
                <p>
                    As soon as you're signed up you can start creating your very
                    own collection of unforgetable Quotes
                </p>
                <NinjaQuote />
            </main>
        </>
    );
};

export default Home;
