import { Router } from "express";
 import * as Controller from"./Controller/user.js"
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import { UploadImage } from "../../Utils/Multer.js";

export const userRouter=Router()

//Route
userRouter.route('/')
         .get(AuthMiddleware(Roles.user),Controller.GetUser)


userRouter.patch('/image',AuthMiddleware(Roles.user),UploadImage().single('image'),Controller.UploadImage)
// userRouter.patch('/image',Auth(Roles.user),UploadImage().single('image'),usercotroller.UpdateImage)
// userRouter.patch('/password',Auth(Roles.user),Validation_Middleware(UpdatePassword),usercotroller.UpdatePassword)
// userRouter.put('/',Auth(Roles.user),usercotroller.UpdateUser)