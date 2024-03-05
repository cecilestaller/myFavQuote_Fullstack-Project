import express from "express";
import { QuoteController } from "../controllers/index.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";

export const quoteRouter = express
    .Router()
    .post("/", doJwtAuth, QuoteController.postNewQuoteCtrl)
    .get("/", doJwtAuth, QuoteController.getAllQuotesCtrl)
    .delete("/:quoteId", doJwtAuth, QuoteController.removeQuoteCtrl)
    .get("/details/:quoteId", doJwtAuth, QuoteController.getQuoteDetailsCtrl)
    .patch("/edit/:quoteId", doJwtAuth, QuoteController.patchEditQuoteCtrl)
    .patch("/toggleFav/:quoteId", doJwtAuth, QuoteController.patchToggleFavCtrl)
    .get(
        "/authorQuotes/:authorId",
        doJwtAuth,
        QuoteController.getAuthorQuotesCtrl
    );
