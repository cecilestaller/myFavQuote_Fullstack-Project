import { Quote } from "../models/index.js";

export async function toggleFav(authenticatedUserId, quoteId) {
    // find Quote
    const foundQuote = await Quote.findOne({
        userId: authenticatedUserId,
        _id: quoteId,
    });
    if (!foundQuote) throw new Error("Quote dosn't exist anymore");

    // find Quote and update
    const filter = { _id: quoteId };
    const update = { isFavorite: !foundQuote.isFavorite };
    const updatedQuote = await Quote.findOneAndUpdate(filter, update, {
        new: true,
    });

    return updatedQuote;
}
