import { Quote } from "../models/index.js";

export async function editQuote(authenticatedUserId, quoteId, quoteInfo) {
    // define filterOption and Update
    const filter = { userId: authenticatedUserId, _id: quoteId };
    const update = {
        quoteText: quoteInfo.quoteText,
        saidAt: quoteInfo.saidAt,
        context: quoteInfo.context,
    };
    // find Quote and update with option { new: true } --> updated Quote will be returned
    const updatedQuote = await Quote.findOneAndUpdate(filter, update, {
        new: true,
    });
    return updatedQuote;
}
