// CONTROLLERS-LAYER (import/ export {})
import { postRegisterUser } from "./userController.js";
import { patchVerifyEmailCtrl } from "./userController.js";
import { postLoginUserCtrl } from "./userController.js";
import { postRefreshTokenCtrl } from "./userController.js";
import { postLogoutCtrl } from "./userController.js";
import { patchEditProfileCtrl } from "./userController.js";
import { getSingleUserCtrl } from "./userController.js";

import { postNewQuoteCtrl } from "./quoteController.js";
import { getAllQuotesCtrl } from "./quoteController.js";
import { removeQuoteCtrl } from "./quoteController.js";
import { getQuoteDetailsCtrl } from "./quoteController.js";
import { patchEditQuoteCtrl } from "./quoteController.js";
import { patchToggleFavCtrl } from "./quoteController.js";
import { getAuthorQuotesCtrl } from "./quoteController.js";
import { getFavQuotesCtrl } from "./quoteController.js";

import { patchEditAuthorCtrl } from "./authorController.js";
import { getAllAuthorsCtrl } from "./authorController.js";
import { deleteAuthorAndQuotesCtrl } from "./authorController.js";

import { postFileUploadCtrl } from "./fileUploadController.js";

export const UserController = {
    postRegisterUser,
    patchVerifyEmailCtrl,
    postLoginUserCtrl,
    postRefreshTokenCtrl,
    postLogoutCtrl,
    patchEditProfileCtrl,
    getSingleUserCtrl,
};

export const QuoteController = {
    postNewQuoteCtrl,
    getAllQuotesCtrl,
    removeQuoteCtrl,
    getQuoteDetailsCtrl,
    patchEditQuoteCtrl,
    patchToggleFavCtrl,
    getAuthorQuotesCtrl,
    getFavQuotesCtrl,
};

export const AuthorController = {
    patchEditAuthorCtrl,
    getAllAuthorsCtrl,
    deleteAuthorAndQuotesCtrl,
};

export const FileController = {
    postFileUploadCtrl,
};
