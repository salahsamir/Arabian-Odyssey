import { Router } from "express";
import * as Controller from "./Controller/food.js"
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import { UploadImage } from "../../Utils/Multer.js";


export const FoodRouter=Router()
FoodRouter.route('/').get(Controller.GetAllFood)
          .post(AuthMiddleware(Roles.admin),UploadImage().single('image'),Controller.AddFood)

FoodRouter.route('/:id').get(Controller.GetSpeficificFood).put(AuthMiddleware(Roles.admin),UploadImage().single('image'),Controller.UpdateFood)