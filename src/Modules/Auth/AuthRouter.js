import { Router } from "express";
import * as Controller from './Controller/auth.js'
import { Validation_Middleware } from "../../middleware/Validtions.js";
import { signup,signin, confiremEmail,email,code,password } from "./AuthValidation.js";

export const AuthRouter=Router()

AuthRouter.post('/signup',Validation_Middleware(signup),Controller.SignUp)
AuthRouter.get('/verify/:token',Validation_Middleware(confiremEmail),Controller.ConfiremEmail)
AuthRouter.post('/signin',Validation_Middleware(signin),Controller.SignIn)
AuthRouter.post('/email',Validation_Middleware(email),Controller.SendEmail)
AuthRouter.post('/code/:token',Validation_Middleware(code),Controller.CheckCode)
AuthRouter.patch('/password/:token',Validation_Middleware(password),Controller.updatePassword)
