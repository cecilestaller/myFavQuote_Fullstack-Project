import { User } from "../models/index.js";
import { createToken } from "../utils/jwt.js";

export async function refreshToken(authenticatedUserId) {
    // find authenticated User with valid refresh Token
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist anymore");

    // create new accessToken
    const newAccessToken = createToken(foundUser, "access");
    return { newAccessToken };
}
