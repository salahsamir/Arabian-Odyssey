import { Router } from "express";
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import * as Controller from "./Controller/country.js";
import { UploadImage } from "../../Utils/Multer.js";

export const CountryRouter = Router();

CountryRouter.route('/').get(Controller.GetAllCountry).post(AuthMiddleware(Roles.admin), UploadImage().fields([{ name: 'images' }, { name: 'flag' }]), Controller.CreateCountry);

CountryRouter.route('/:id').get(Controller.GetSpecificCountry).put(AuthMiddleware(Roles.admin), UploadImage().fields([{ name: 'images' }, { name: 'flag' }]), Controller.UpdateCountry)