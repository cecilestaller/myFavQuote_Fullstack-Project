import { User } from "../models/index.js";
import { generateRandomSalt, hashPassword } from "../utils/hash.js";
import { sendVerificationEmail } from "../utils/verificationEmail.js";

/* What should registerUser-Service do?: 
---> check if user with email already exists
---> generateRandomSalt and hash PW 
---> send verification Mail
---> return User without sensible Data */

// userInfo from FE: { userName, email, password }

export async function registerUser({ userName, email, password }) {
    // check if some user with this email already exists:
    const foundUser = await User.findByEmail(email);
    if (foundUser) throw new Error("User with this Email already exists");

    // hash PW:
    const pwSalt = generateRandomSalt();
    const pwHash = hashPassword(password, pwSalt);

    // create new User() and user.save combined:
    const user = await User.create({
        userName,
        email,
        pwHash,
        pwSalt,
    });

    // send verification Email:
    await sendVerificationEmail(user);

    // return user without sensible Data:
    return userToProfileInfo(user);
}

function userToProfileInfo({ _id, userName, email, profilePicUrl }) {
    return { _id, userName, email, profilePicUrl };
}
