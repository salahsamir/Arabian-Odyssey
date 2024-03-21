import { Router } from "express";
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import { UploadImage } from "../../Utils/Multer.js";
import * as Controller from "./Controller/attraction.js"

export const AttractionRouter =Router()

AttractionRouter.route('/')
.get(Controller.GetAllAttraction)
.post(AuthMiddleware(Roles.admin),UploadImage().fields([{name:"images"},{name:"mainImage"}]),Controller.AddAttraction)
AttractionRouter.get('/home',Controller.GetHomeAttraction)
AttractionRouter.route('/:id')
.get(Controller.GetSpecificAttraction)
// .put(AuthMiddleware(Roles.admin),UploadImage().fields([{name:"images"},{name:"mainImage"}]),Controller.UpdateAttraction)