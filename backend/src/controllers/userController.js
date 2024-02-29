import { catchAsync } from "../utils/catchAsync.js";
import { UserService } from "../services/index.js";

// NOTE to catchAsync: Param1: Contoller-Function (try{}-Block), Param2: Error-Message

export const postRegisterUser = catchAsync(
    async (req, res) => {
        const result = await UserService.registerUser(req.body);
        res.status(201).json({ success: true, result });
    },
    { message: "Could not register user" }
);

export const patchVerifyEmailCtrl = catchAsync(
    async (req, res) => {
        const userId = req.body.userId;
        const sixDigitCode = req.body.sixDigitCode;
        const result = await UserService.verifyEmail({ userId, sixDigitCode });
        res.json({ success: true, result });
    },
    { message: "Could not verify Email" }
);

export const postLoginUserCtrl = catchAsync(
    async (req, res) => {
        const loginInfo = {
            email: req.body.email,
            password: req.body.password,
        };
        const result = await UserService.loginUser(loginInfo);
        // tokens in service created --> save refreshToken in COOKIE-SESSION
        req.session.refreshToken = result.tokens.refreshToken;
        console.log(req.session);
        res.json({ success: true, result });
    },
    { message: "Could not login User" }
);

export const postRefreshTokenCtrl = catchAsync(
    async (req, res) => {
        // check if token type is "refresh"
        if (req.verifiedUserClaims.type !== "refresh") {
            throw new Error("Token must be type 'refresh");
        }
        // valid refreshToken...
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const result = await UserService.refreshToken(authenticatedUserId);
        res.json({ success: true, result });
    },
    { message: "Could not create newAccessToken with refreshToken" }
);

export const postLogoutCtrl = catchAsync(
    async (req, res) => {
        req.session.refreshToken = null;
        res.json({ success: true });
    },
    { message: "Could not logout" }
);

export const patchEditProfileCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const profileInfo = req.body;
        const result = await UserService.editUserProfile(
            authenticatedUserId,
            profileInfo
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not update User-Profile" }
);
