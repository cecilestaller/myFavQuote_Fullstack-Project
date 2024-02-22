import express from "express";
import { UserController } from "../controllers/index.js";

/* Alternative Schreibweise zu: 
const userRouter = express.Router(); 
userRouter.get(); 
userRouter.post() 
etc 

Endpunkte können so aneinandergekettet werden (Chaining!)
*/

export const userRouter = express
    .Router()
    .post("/register", UserController.postRegisterUser)
    .patch("/verifyEmail", UserController.patchVerifyEmailCtrl)
    .post("/login", UserController.postLoginUserCtrl);
