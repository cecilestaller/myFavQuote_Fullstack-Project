// SERVICE-LAYER (import/export)
import { registerUser } from "./registerUser.js";
import { verifyEmail } from "./verifyEmail.js";
import { loginUser } from "./loginUser.js";
import { refreshToken } from "./refreshToken.js";
import { editUserProfile } from "./editUserProfile.js";
import { singleUserInfo } from "./singleUserInfo.js";

import { addNewQuote } from "./addNewQuote.js";
import { getAllQuotes } from "./getAllQuotes.js";
import { deleteOneQuote } from "./deleteOneQuote.js";
import { getQuoteDetails } from "./getQuoteDetails.js";
import { editQuote } from "./editQuote.js";
import { toggleFav } from "./toggleFav.js";
import { getAllQuotesOfAuthor } from "./getAllQuotesOfAuthor.js";
import { getFavQuotes } from "./getFavQuotes.js";

import { editAuthor } from "./editAuthor.js";
import { getAllAuthors } from "./getAllAuthors.js";
import { deleteAuthor } from "./deleteAuthor.js";

export const UserService = {
    registerUser,
    verifyEmail,
    loginUser,
    refreshToken,
    editUserProfile,
    singleUserInfo,
};

export const QuoteService = {
    addNewQuote,
    getAllQuotes,
    deleteOneQuote,
    getQuoteDetails,
    editQuote,
    toggleFav,
    getAllQuotesOfAuthor,
    getFavQuotes,
};

export const AuthorService = {
    editAuthor,
    getAllAuthors,
    deleteAuthor,
};
