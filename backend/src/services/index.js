// SERVICE-LAYER (import/export)
import { registerUser } from "./registerUser.js";
import { verifyEmail } from "./verifyEmail.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";

import { addNewQuote } from "./addNewQuote.js";
import { getAllQuotes } from "./getAllQuotes.js";
import { deleteOneQuote } from "./deleteOneQuote.js";
import { getQuoteDetails } from "./getQuoteDetails.js";
import { editQuote } from "./editQuote.js";
import { toggleFav } from "./toggleFav.js";

import { editAuthor } from "./editAuthor.js";
import { getAllAuthors } from "./getAllAuthors.js";

export const UserService = {
    registerUser,
    verifyEmail,
    loginUser,
    refreshToken,
};

export const QuoteService = {
    addNewQuote,
    getAllQuotes,
    deleteOneQuote,
    getQuoteDetails,
    editQuote,
    toggleFav,
};

export const AuthorService = {
    editAuthor,
    getAllAuthors,
};
