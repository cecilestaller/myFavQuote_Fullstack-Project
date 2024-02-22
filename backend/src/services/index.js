// SERVICE-LAYER (import/export)
import { registerUser } from "./registerUser.js";
import { verifyEmail } from "./verifyEmail.js";

export const UserService = {
    registerUser,
    verifyEmail,
};
