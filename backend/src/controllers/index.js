// CONTROLLERS-LAYER (import/ export {})
import { postRegisterUser } from "./userController.js";
import { patchVerifyEmailCtrl } from "./userController.js";
import { postLoginUserCtrl } from "./userController.js";

export const UserController = {
    postRegisterUser,
    patchVerifyEmailCtrl,
    postLoginUserCtrl,
};
