// CONTROLLERS-LAYER (import/ export {})
import { postRegisterUser } from "./userController.js";
import { postVerifyEmailCtrl } from "./userController.js";

export const UserController = {
    postRegisterUser,
    postVerifyEmailCtrl,
};
