import { User } from "../models/index.js";

export async function singleUserInfo(authenticatedUserId) {
    const foundUser = await User.findById(authenticatedUserId);
    if (!foundUser) throw new Error("User doesn't exist any more");

    return userToProfileInfo(foundUser);
}

function userToProfileInfo({ _id, userName, email, profilePicUrl }) {
    return { _id, userName, email, profilePicUrl };
}
