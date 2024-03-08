import { Author, User, Quote } from "../models/index.js";

export async function deleteAuthor(authenticatedUserId, authorId) {
    // find User
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");
    // find Author of User
    const foundAuthor = await Author.findOne({
        userId: foundUser._id,
        _id: authorId,
    });
    if (!foundAuthor) throw new Error("Author doesn't exist anymore");
    // find All Quotes of Author (matching)
    const foundQuotes = await Quote.find({
        userId: foundUser._id,
        authorId: foundAuthor._id,
    });
    // delete Quotes of Author

    // delete Author
}
