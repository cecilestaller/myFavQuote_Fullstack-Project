import { Quote } from "../models/index.js";

export async function deleteOneQuote(authenticatedUserId, quoteId) {
    // find Quote
    const foundQuote = await Quote.findById(quoteId);
    if (!foundQuote) throw new Error("Quote doesn't exist");

    // check if quote was created by authenticated User (to be on the safe side)
    if (foundQuote.userId.toString() !== authenticatedUserId)
        throw new Error("You can't delete Quotes created by other users");

    // delete Quote
    const deletedQuote = await Quote.findByIdAndDelete(foundQuote._id);
    return deletedQuote;
}
