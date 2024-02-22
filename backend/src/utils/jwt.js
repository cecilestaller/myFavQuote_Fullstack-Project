import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const jwtSecret = process.env.JWT_SECRET;

export function createToken(user, tokenType = "access") {
    // expiresInObj["access"] // === expiresInObj.access ==> 1h
    // expiresInObj["refresh"] // === expiresInObj.refresh ==> 10d
    // expiresInObj["unknownType"] // === expiresInObj.unknownType ===> undefined ==> default "10min"
    const expiresIn =
        {
            access: "1h",
            refresh: "10d",
        }[tokenType] || "10min";
    const tokenPayload = {
        sub: user._id.toString(), // subject ist bei uns immer die user-id
        type: tokenType, // note: es kann auch andere tokenTypes geben (zb refresh, verifyEmail, resetPw)
    };
    const options = { algorithm: "HS256", expiresIn }; // algorithm ist HS256 auch schon per default
    const tokenString = jwt.sign(tokenPayload, jwtSecret, options);
    return tokenString;
}
