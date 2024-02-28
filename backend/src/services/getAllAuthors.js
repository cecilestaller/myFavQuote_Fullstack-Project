import { Author } from "../models/index.js";

export async function getAllAuthors(authenticatedUserId) {
    const authors = await Author.find({ userId: authenticatedUserId });
    return authors;
}
