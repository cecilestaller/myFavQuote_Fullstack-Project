import { Quote } from "../models/index.js";

export async function getAllQuotes(authenticatedUserId) {
    const quotes = await Quote.find({ userId: authenticatedUserId });
    return quotes;
}
