import { Router } from "express";
import * as Controller from "./Controller/category.js";
import { UploadImage } from "../../Utils/Multer.js";
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
export const CategoryRouter = Router();
CategoryRouter.route("/")
  .get(Controller.GetAllCategory)
  .post(
    AuthMiddleware(Roles.admin),
    UploadImage().single("image"),
    Controller.CreateCategory
  );
CategoryRouter.route("/:id")
  .get(Controller.GetSpecificCategory)
  .put(
    AuthMiddleware(Roles.admin),
    UploadImage().single("image"),
    Controller.UpdateCategory
  )
CategoryRouter.delete('/:id',AuthMiddleware(Roles.admin),Controller.DeletedCategory)
