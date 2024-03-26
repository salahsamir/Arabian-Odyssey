import { AttractionCollection } from "../../../../Db/Models/Attraction.js";
import { reviewCollection } from "../../../../Db/Models/Review.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";

export const AddReview=AsyncHandeller(
    async(req,res,next)=>{
        const {attraction}=req.params
     
        req.body.user=req.user._id
        if(!attraction||!await AttractionCollection.findOne({_id:attraction})){
            return next(new Error("attraction not found",{cause:404}))
        }
        if(req.body.rating<1||req.body.rating>5){
            return next(new Error("rating not found",{cause:404}))
        }
        req.body.attraction=attraction
        const review=await reviewCollection.create(req.body)
        return review?res.status(200).json({message:"success",review}):res.status(400).json({message:"review not created"})
    }
)

export const GetAllReview=AsyncHandeller(
    async(req,res,next)=>{
        const review=await reviewCollection.find()
        return review?res.status(200).json({message:"success",length:review.length,review}):res.status(400).json({message:"review not found"})
    }
)
export const GetSpecificReview=AsyncHandeller(
    async(req,res,next)=>{
        const review=await reviewCollection.findOne({attraction:req.params.attraction}).populate([
            {
                path:"user",
                select:"name image"
            }
        ])
        return review?res.status(200).json({message:"success",length:review.length,review}):res.status(400).json({message:"review not found"})
    }
)