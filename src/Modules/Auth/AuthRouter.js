import { Router } from "express";
import * as Controller from './Controller/auth.js'
import { ValidationMiddleware } from "../../Middleware/Validtions.js";
import { signup,signin, confiremEmail,email,code,password } from "./AuthValidation.js";
export const AuthRouter=Router()
AuthRouter.post('/signup',ValidationMiddleware(signup),Controller.SignUp)
AuthRouter.get('/verify/:token',ValidationMiddleware(confiremEmail),Controller.ConfiremEmail)
AuthRouter.post('/signin',ValidationMiddleware(signin),Controller.SignIn)
AuthRouter.post('/email',ValidationMiddleware(email),Controller.SendEmail)
AuthRouter.post('/code/:token',ValidationMiddleware(code),Controller.CheckCode)
AuthRouter.patch('/password/:token',ValidationMiddleware(password),Controller.updatePassword)
