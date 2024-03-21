import { AttractionCollection } from "../../../../Db/Models/Attraction.js";
import { CategoryCollection } from "../../../../Db/Models/Category.js";
import { StateCollection } from "../../../../Db/Models/State.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";


export const AddAttraction=AsyncHandeller(
    async(req,res,next)=>{
        req.body.user=req.user._id
        const {state,country,category}=req.body
        if(!state||!await StateCollection.findOne({_id:state,country})){
            return next(new Error("state not found",{cause:404}))
            
        }
        if(category){
            for (const ele of category) {
                if(!await CategoryCollection.findById(ele)){
                    return next(new Error("category not found",{cause:404}))
                } 
                 
                
            } 
        }
        if(req.files.mainImage){
            const { secure_url, public_id } = await Cloud.uploader.upload(req.files.mainImage[0].path, { folder: 'Country' });
            req.body.mainImage = { path: secure_url, public_id };
        }
        if(req.files.images){
            const images=[]
            for(const element of req.files.images){
                const {secure_url,public_id}=await Cloud.uploader.upload(element.path,{folder:'Attraction'})
                images.push({path:secure_url,public_id})
            }
            req.body.images=images
        }

        const attraction=await AttractionCollection.create(req.body)
        return attraction?res.status(201).json({message:"success",attraction}):res.status(400).json({message:"attraction not created"})
        
    }
)


export const GetAllAttraction=AsyncHandeller(
    async(req,res,next)=>{
        const attraction=await AttractionCollection.find()
        return attraction?res.status(200).json({message:"success",length:attraction.length,attraction}):res.status(400).json({message:"attraction not found"})
    }
)
export const GetHomeAttraction=AsyncHandeller(
    async(req,res,next)=>{
        const attraction=await AttractionCollection.find().populate([
            {
                path:"country",
                select:"name "
            }
        ]).select("name mainImage rating")

        return attraction?res.status(200).json({message:"success",length:attraction.length,attraction}):res.status(400).json({message:"attraction not found"})
    }
)
export const GetSpecificAttraction=AsyncHandeller(
    async(req,res,next)=>{
        const attraction=await AttractionCollection.findById(req.params.id)
        return attraction?res.status(200).json({message:"success",attraction}):res.status(400).json({message:"attraction not found"})
    }
)