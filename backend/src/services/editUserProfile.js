import { User } from "../models/index.js";

export async function editUserProfile(authenticatedUserId, profileInfo) {
    const filter = { _id: authenticatedUserId };
    const update = {
        userName: profileInfo.userName,
        profilePicUrl: profileInfo.profilePicUrl,
    };
    const updatedUser = await User.findOneAndUpdate(filter, update, {
        new: true,
    });

    return updatedUser.toProfileInfo();
}
