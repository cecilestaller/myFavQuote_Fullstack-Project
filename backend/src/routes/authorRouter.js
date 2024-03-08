import express from "express";
import { doJwtAuth } from "../middleware/doJwtAuth.js";
import { AuthorController } from "../controllers/index.js";

export const authorRouter = express
    .Router()
    .patch(
        "/editAuthor/:authorId",
        doJwtAuth,
        AuthorController.patchEditAuthorCtrl
    )
    .get("/", doJwtAuth, AuthorController.getAllAuthorsCtrl)
    .delete(
        "/:authorId",
        doJwtAuth,
        AuthorController.deleteAuthorAndQuotesCtrl
    );
