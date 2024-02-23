import NinjaQuote from "../components/NinjaQuote";

const Home = () => {
    return (
        <>
            <main>
                <h2>Welcome to myFavQuotes</h2>
                <h3>
                    The App that helps you remember EVERYTHING collagues, loved
                    Ones or friends said
                </h3>
                <p>
                    Everybody likes to quote famous people, but people close to
                    you also have a lot to say what's worth remembering!
                </p>
                <p>You can stroll through famous quotes here</p>
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
