import { Router } from "express";
import * as Controller from './Controller/state.js'
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import { UploadImage } from "../../Utils/Multer.js";

export const StateRouter=Router()

StateRouter.route('/').get(Controller.GetAllState)
           .post(AuthMiddleware(Roles.user),UploadImage().single('image'),Controller.CreateState)
StateRouter.route('/:id').get(Controller.GetSpecificState).put(AuthMiddleware(Roles.user),UploadImage().single('image'),Controller.UpdateState)