import { Quote, Author, User } from "../models/index.js";

export async function addNewQuote(
    authenticatedUserId,
    { quoteText, author, saidAt, context }
) {
    // find User byId
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesnt exist anymore");

    // find/ get Author
    const foundAuthor = await checkIfAuthorExistsOrCreateNew(
        author,
        authenticatedUserId
    );

    // create new Quote
    const quote = new Quote({
        quoteText,
        author: foundAuthor.authorName,
        authorId: foundAuthor._id,
        saidAt,
        context,
        userId: authenticatedUserId,
    });
    await quote.save();

    return {
        userInfo: foundUser.toProfileInfo(),
        authorInfo: foundAuthor.toAuthorInfo(),
        quote,
    };
}

async function checkIfAuthorExistsOrCreateNew(author, authenticatedUserId) {
    // check if author already exists
    const foundAuthor = await Author.findOne({ authorName: author });

    if (foundAuthor) {
        return foundAuthor;
    } else {
        // author doesn't exists yet --> create new Author:
        const createdAuthor = new Author({
            authorName: author,
            userId: authenticatedUserId,
        });
        await createdAuthor.save();
        return createdAuthor;
    }
}
