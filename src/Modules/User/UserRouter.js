import { Router } from "express";
import { Auth, Roles } from "../../middleware/Auth.js";
import * as usercotroller from './Controller/user.js'
import { UploadImage } from "../../Utils/Multer.js";
import { Validation_Middleware } from "../../middleware/Validtions.js";
import { UpdatePassword } from "./userValadition.js";
export const userRouter=Router()


userRouter.get('/',Auth(Roles.user),usercotroller.getUser)
userRouter.patch('/image',Auth(Roles.user),UploadImage().single('image'),usercotroller.UpdateImage)
userRouter.patch('/password',Auth(Roles.user),Validation_Middleware(UpdatePassword),usercotroller.UpdatePassword)
userRouter.put('/',Auth(Roles.user),usercotroller.UpdateUser)