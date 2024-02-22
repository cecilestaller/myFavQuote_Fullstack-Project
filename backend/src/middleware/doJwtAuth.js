import jwt from "jsonwebtoken";

export async function doJwtAuth(req, res, next) {
    const _invalidAuthResponse = (message) =>
        res.status(401).json({
            success: false,
            message: message || "Invalid authentication",
        });

    try {
        const tokenString = extractTokenFromRequest();
        // try catch, bc jwt.verify() throws Error if token invalid
        const tokenPayload = jwt.verify(tokenString, process.env.JWT_SECRET);
        // new req-field created for tokenPayload with important information
        req.verifiedUserClaims = tokenPayload; // { sub === id --> user from db, iat, exp, type }
        next(); // jwt valid -> next()
    } catch (error) {
        // jwt invalid
        console.log(error);
        return _invalidAuthResponse("Invalid token");
    }

    function extractTokenFromRequest() {
        // we assume it's an accessToken and first look into req.headers.authorization
        // example: req.headers.authorization: 'Bearer eyJh...XVCJ9.eyJz...yOTB9.m6rp-GyRiY4-6r...mELI',
        const authorization = req.headers.authorization;
        if (authorization) {
            const [authType, tokenString] = authorization.split(" ");
            if (authType !== "Bearer" || !tokenString) return null;
            else return tokenString;
        } else {
            // if there's no accessToken in header (authorization = false)I assume it's a refreshToken in the cookie-session (can be true or undefined)
            return req.session.refreshToken;
        }
    }
}
