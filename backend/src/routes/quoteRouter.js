import express from "express";
import { QuoteController } from "../controllers/index.js";
import { doJwtAuth } from "../middleware/doJwtAuth.js";

export const quoteRouter = express
    .Router()
    .post("/:userId", doJwtAuth, QuoteController.postNewQuoteCtrl)
    .get("/:userId", doJwtAuth, QuoteController.getAllQuotesCtrl)
    .delete("/:userId/:quoteId", doJwtAuth, QuoteController.removeQuoteCtrl);
