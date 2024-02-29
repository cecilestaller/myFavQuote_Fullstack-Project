import { useEffect, useState } from "react";

const NinjaQuote = () => {
    const [zenQuoteData, setZenQuoteData] = useState([]);

    const fetchZenQuotes = async () => {
        try {
            const response = await fetch(
                "https://api.api-ninjas.com/v1/quotes",
                {
                    headers: {
                        "X-Api-Key": "/8TKHYTXfv4QDhZ0omRLKQ==XxkiQCxliUIVZJqM",
                    },
                }
            );
            const data = await response.json();
            if (!data) throw error;
            setZenQuoteData(data);
        } catch (error) {
            console.log(error);
        }
    };
    useEffect(() => {
        fetchZenQuotes();
    }, []);

    console.log(zenQuoteData);
    return (
        <>
            <section>
                {zenQuoteData?.map((singleQuote, index) => {
                    return (
                        <article key={index} className="quote_wrap">
                            <p className="quote_text">"{singleQuote.quote}"</p>
                            <h4 className="author">{singleQuote.author}</h4>
                            <p className="quote_info">
                                Category: {singleQuote.category}
                            </p>
                        </article>
                    );
                })}
            </section>
        </>
    );
};

export default NinjaQuote;
