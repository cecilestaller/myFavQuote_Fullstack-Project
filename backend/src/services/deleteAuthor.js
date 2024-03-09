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
    if (foundQuotes.length === 0) {
        // no more quotes of author exists, delete author directly
        const deletedAuthor = await Author.deleteOne({
            userId: foundUser._id,
            _id: foundAuthor._id,
        });
        return deletedAuthor;
    } else if (foundQuotes.length > 0) {
        // delete Quotes of Author first
        const deletedQuotes = await Quote.deleteMany({
            userId: foundUser._id,
            authorId: foundAuthor._id,
        });
        const deletedAuthor = await Author.deleteOne({
            userId: foundUser._id,
            _id: foundAuthor._id,
        });
        return { deletedAuthor, deletedQuotes };
    }
}
