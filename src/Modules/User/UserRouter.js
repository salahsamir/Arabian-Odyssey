import { Router } from "express";
 import * as Controller from"./Controller/user.js"
 import * as Validation from"./userValadition.js"

import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import { UploadImage } from "../../Utils/Multer.js";
import { ValidationMiddleware } from "../../middleware/Validtions.js";

export const userRouter=Router()

//Route
userRouter.route('/')
         .get(AuthMiddleware(Roles.user),Controller.GetUser)
         .put(AuthMiddleware(Roles.user),Controller.UpdateUser)
         .delete(AuthMiddleware(Roles.user),Controller.DeleteUser)
         .patch(AuthMiddleware(Roles.user),Controller.Logout)


userRouter.patch('/image',AuthMiddleware(Roles.user),UploadImage().single('image'),Controller.UploadImage)
userRouter.patch('/password',AuthMiddleware(Roles.user),ValidationMiddleware(Validation.UpdatePassword),Controller.UpdatePassword)
// userRouter.patch('/image',Auth(Roles.user),UploadImage().single('image'),usercotroller.UpdateImage)
// userRouter.put('/',Auth(Roles.user),usercotroller.UpdateUser)