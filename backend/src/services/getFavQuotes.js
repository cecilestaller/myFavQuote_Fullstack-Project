import { Quote, User } from "../models/index.js";

export async function getFavQuotes(authenticatedUserId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    const foundFavQuotes = await Quote.find({
        isFavorite: true,
        userId: foundUser._id,
    });
    if (foundFavQuotes.length === 0)
        throw new Error("User has not yet marked any quotes as favorites");

    return foundFavQuotes;
}
