import { Router } from "express";
import { AuthMiddleware, Roles } from "../../Middleware/Auth.js";
import * as  Controller from './Controller/review.js'
export const ReviewRouter=Router()


ReviewRouter.route('/').get(Controller.GetAllReview)

ReviewRouter.route('/:attraction').get(Controller.GetSpecificReview).post(AuthMiddleware(Roles.user),Controller.AddReview)
