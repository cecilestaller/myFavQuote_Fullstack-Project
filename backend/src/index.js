//* HAUPT-INDEX

import express from "express";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import mongoose from "mongoose";
import cookieSession from "cookie-session";
import { userRouter } from "./routes/userRouter.js";
import { quoteRouter } from "./routes/quoteRouter.js";
import { authorRouter } from "./routes/authorRouter.js";
import { fileUploadRouter } from "./routes/fileUploadRouter.js";

dotenv.config();

// Variablen definieren für COOKIE-SESSION
const tenDaysInMs = 10 * 24 * 60 * 60 * 1000;
const isFrontendLocalhost =
    process.env.FRONTEND_URL.startsWith("http://localhost");
const cookieSessionSecret = process.env.COOKIE_SESSION_SECRET;

// Variablen definieren für DB-CONNECTION und SERVER-START
const MONGODB_URL = process.env.MONGODB_URL;
const PORT = process.env.PORT || 3003;

// ===== Server aufsetzen:
const app = express();

// ==== MIDDLEWARES:

// re-configure cors middleware (for COOKIE-SESSION)
app.use(cors({ origin: [process.env.FRONTEND_URL], credentials: true }));

app.set("trust proxy", 1); // trust first proxy
const cookieSessionOptions = {
    name: "session",
    secret: cookieSessionSecret, // frei wählbar
    httpOnly: true,
    expires: new Date(Date.now() + tenDaysInMs),
    sameSite: isFrontendLocalhost ? "lax" : "none",
    secure: isFrontendLocalhost ? false : true,
};
console.log(cookieSessionOptions);
app.use(cookieSession(cookieSessionOptions)); //* --> COOKIE-PARSER

// -------------------
app.use(morgan("dev")); // logging middleware
app.use(express.json()); // body-parser

// -------------------
// * ROUTER-Middlewares:

app.get("/", (req, res) => res.send("it works"));

app.use("/download", express.static("data/images")); // download assets via static middleware (MULTER)
app.use("/api/v1/files", fileUploadRouter); // * upload files

app.use("/api/v1/users", userRouter);
app.use("/api/v1/quotes", quoteRouter);
app.use("/api/v1/authors", authorRouter);

// ---------------
// Declaration of serverListenPort-function which will be called in the DB-connection setup:

const serverListenPort = () =>
    app.listen(PORT, () =>
        console.log("Server listening & ready at PORT: ", PORT)
    );

// ===== SERVER & DB CONNECTION SETUP:
console.log("Connecting to database...");

mongoose
    .connect(MONGODB_URL, { dbName: "myFavQuotesApp" })
    .then(() => {
        console.log("DB connection successful");
        serverListenPort();
    })
    .catch((err) => {
        console.log("Error connecting to database!");
        console.log(err);
        console.log("Server will not start. Aborting...");
        process.exit(); // beende den node prozess (clean exit)
    });
