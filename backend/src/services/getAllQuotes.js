import { Quote } from "../models/index.js";

export async function getAllQuotes(authenticatedUserId) {
    const quotes = await Quote.find({ userId: authenticatedUserId });
    if (quotes.length === 0)
        throw new Error("User has not added any quotes yet");
    return quotes;
}
