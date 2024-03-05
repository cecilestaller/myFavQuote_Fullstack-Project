import { catchAsync } from "../utils/catchAsync.js";
import { QuoteService } from "../services/index.js";

export const postNewQuoteCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const quoteInfo = req.body;
        const result = await QuoteService.addNewQuote(
            authenticatedUserId,
            quoteInfo
        );
        res.status(201).json({ success: true, result });
    },
    { message: "Could not create new Quote" }
);

export const getAllQuotesCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const result = await QuoteService.getAllQuotes(authenticatedUserId);
        res.status(200).json({ success: true, result });
    },
    { message: "Could not retrieve quotes" }
);

export const removeQuoteCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const quoteId = req.params.quoteId;
        const result = await QuoteService.deleteOneQuote(
            authenticatedUserId,
            quoteId
        );
        res.json({ success: true, result });
    },
    { message: "Could not delete Quote" }
);

export const getQuoteDetailsCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const quoteId = req.params.quoteId;
        const result = await QuoteService.getQuoteDetails(
            authenticatedUserId,
            quoteId
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not get Quote Details" }
);

export const patchEditQuoteCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const quoteId = req.params.quoteId;
        const quoteInfo = req.body;
        const result = await QuoteService.editQuote(
            authenticatedUserId,
            quoteId,
            quoteInfo
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Quote-Update failed" }
);

export const patchToggleFavCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const quoteId = req.params.quoteId;
        const result = await QuoteService.toggleFav(
            authenticatedUserId,
            quoteId
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Quote-Update failed" }
);

export const getAuthorQuotesCtrl = catchAsync(
    async (req, res) => {
        const authenticatedUserId = req.verifiedUserClaims.sub;
        const authorId = req.params.authorId;
        const result = await QuoteService.getAllQuotesOfAuthor(
            authenticatedUserId,
            authorId
        );
        res.status(200).json({ success: true, result });
    },
    { message: "Could not retrieve Quotes" }
);
