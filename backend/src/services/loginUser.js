import { User } from "../models/index.js";
import { hashPassword } from "../utils/hash.js";
import { createToken } from "../utils/jwt.js";

export async function loginUser({ email, password }) {
    // find User --> validate if User with this email exists
    const foundUser = await User.findByEmail(email);
    if (!foundUser) throw new Error("User with this Email doesn't exists");

    // check if foundUser's email is already verified
    if (foundUser.emailVerified === false)
        throw new Error("Email needs to be verified before you can login");

    // password validation:
    const passwordHash = hashPassword(password, foundUser.pwSalt);
    const correctPassword = passwordHash === foundUser.pwHash;
    if (!correctPassword) throw new Error("Invalid Password");

    // email + pw correct! --> create accessToken and refreshToken
    const accessToken = createToken(foundUser, "access");
    const refreshToken = createToken(foundUser, "refresh");

    return {
        user: foundUser.toProfileInfo(),
        tokens: { accessToken, refreshToken },
    };
}
