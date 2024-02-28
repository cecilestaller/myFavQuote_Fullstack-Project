// CONTROLLERS-LAYER (import/ export {})
import { postRegisterUser } from "./userController.js";
import { patchVerifyEmailCtrl } from "./userController.js";
import { postLoginUserCtrl } from "./userController.js";
import { postRefreshTokenCtrl } from "./userController.js";
import { postNewQuoteCtrl } from "./quoteController.js";
import { getAllQuotesCtrl } from "./quoteController.js";
import { removeQuoteCtrl } from "./quoteController.js";
import { postLogoutCtrl } from "./userController.js";
import { getQuoteDetailsCtrl } from "./quoteController.js";
import { patchEditQuoteCtrl } from "./quoteController.js";

export const UserController = {
    postRegisterUser,
    patchVerifyEmailCtrl,
    postLoginUserCtrl,
    postRefreshTokenCtrl,
    postLogoutCtrl,
};

export const QuoteController = {
    postNewQuoteCtrl,
    getAllQuotesCtrl,
    removeQuoteCtrl,
    getQuoteDetailsCtrl,
    patchEditQuoteCtrl,
};
