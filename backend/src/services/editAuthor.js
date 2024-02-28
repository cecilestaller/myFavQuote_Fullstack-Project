import { Author } from "../models/index.js";

export async function editAuthor(authenticatedUserId, authorId, authorInfo) {
    const filter = { _id: authorId, userId: authenticatedUserId };
    const update = {
        authorPicUrl: authorInfo.authorPicUrl,
        role: authorInfo.role,
    };
    const updatedAuthor = await Author.findOneAndUpdate(filter, update, {
        new: true,
    });
    return updatedAuthor;
}
