import { Router } from "express";
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import { UploadImage } from "../../Utils/Multer.js";
import * as Controller from "./Controller/attraction.js"

export const AttractionRouter =Router()

AttractionRouter.route('/')
.get(Controller.GetAllAttraction)
.get(Controller.SearchAttraction)
.post(AuthMiddleware(Roles.user),UploadImage().fields([{name:"images"},{name:"image"}]),Controller.AddAttraction)


AttractionRouter.get('/home',Controller.GetHomeAttraction)
AttractionRouter.route('/:id')
.get(Controller.GetSpecificAttraction)
.put(AuthMiddleware(Roles.user),UploadImage().fields([{name:"images"},{name:"image"}]),Controller.UpdateAttraction)
