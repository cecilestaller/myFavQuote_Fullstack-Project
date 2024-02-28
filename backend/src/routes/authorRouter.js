import express from "express";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { AuthorController } from "../controllers/index.js";

export const authorRouter = express
    .Router()
    .patch(
        "/:userId/editAuthor/:authorId",
        doJwtAuth,
        AuthorController.patchEditAuthorCtrl
    )
    .get("/:userId", doJwtAuth, AuthorController.getAllAuthorsCtrl);
