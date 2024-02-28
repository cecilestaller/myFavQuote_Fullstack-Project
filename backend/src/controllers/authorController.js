import { AuthorService } from "../services/index.js";
import { catchAsync } from "../utils/catchAsync.js";

export const patchEditAuthorCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const authorId = req.params.authorId;
        const authorInfo = req.body;
        const result = await AuthorService.editAuthor(
            authenticatedUserId,
            authorId,
            authorInfo
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not update Author" }
);

export const getAllAuthorsCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const result = await AuthorService.getAllAuthors(authenticatedUserId);
        res.status(200).json({ success: true, result });
    },
    { message: "Could not retrieve Authors" }
);
