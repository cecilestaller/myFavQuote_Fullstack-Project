import express from "express";
import { UserController } from "../controllers/index.js";

export const userRouter = express
    .Router()
    .post("/register", UserController.postRegisterUser);
