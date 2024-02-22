// SERVICE-LAYER (import/export)
import { registerUser } from "./registerUser.js";
import { verifyEmail } from "./verifyEmail.js";
import { loginUser } from "./loginUser.js";

export const UserService = {
    registerUser,
    verifyEmail,
    loginUser,
};
