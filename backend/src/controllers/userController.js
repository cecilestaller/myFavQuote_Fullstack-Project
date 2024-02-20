import { catchAsync } from "../utils/catchAsync.js";
import { UserService } from "../services/index.js";

// NOTE to catchAsync: Param1: Contoller-Function (try{}-Block), Param2: Error-Message

export const postRegisterUser = catchAsync(
    async (req, res) => {
        const result = await UserService.registerUser(req.body);
        res.json({ success: true, result });
    },
    { message: "Could not register user" }
);
