import { catchAsync } from "../utils/catchAsync.js";

export const postFileUploadCtrl = catchAsync(
    async (req, res) => {
        // if (!req.file) throw new Error("File must be provided");
        const uploadedFilname = req.file.filename;
        res.json({ success: true, result: { filename: uploadedFilname } });
    },
    { message: "Could not upload provided file" }
);
