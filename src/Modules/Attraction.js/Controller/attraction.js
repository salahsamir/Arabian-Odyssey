import { AttractionCollection } from "../../../../Db/Models/Attraction.js";
import { CategoryCollection } from "../../../../Db/Models/Category.js";
import { StateCollection } from "../../../../Db/Models/State.js";
import { ApiFeature } from "../../../Utils/ApiFeature.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";


export const AddAttraction=AsyncHandeller(
    async(req,res,next)=>{
        req.body.user=req.user._id
        const {state,country,category}=req.body
        console.log(category);
        if(!state||!await StateCollection.findOne({_id:state,country})){
            return next(new Error("state not found",{cause:404}))
            
        }
        if(category) {
            let categories = category; // Change const to let
            if (!Array.isArray(categories)) {
                // If category is a single string, convert it to an array with one element
                categories = [categories];
            }
            
            for (const ele of categories) {
                if(!await CategoryCollection.findById(ele)){
                    return next(new Error("category not found",{cause:404}))
                }
            } 
        }
        if(req.files.image){
            const { secure_url, public_id } = await Cloud.uploader.upload(req.files.image[0].path, { folder: 'Country' });
            req.body.image = { path: secure_url, public_id };
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
        const attraction=await AttractionCollection.find().populate([
            {
                path:"country",
                select:"name "
            },
            {
                path:"state",
                select:"name"
            },
            {
                path:"category",
                select:"name "
            },{
                path:"Review",
                select:"rating user comment",
                populate:{
                    path:"user",
                    select:"name image"
                }

            }
        ])
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
        ]).select("name image rating").sort({rating:-1})

        return attraction?res.status(200).json({message:"success",length:attraction.length,attraction}):res.status(400).json({message:"attraction not found"})
    }
)
export const GetSpecificAttraction=AsyncHandeller(
    async(req,res,next)=>{
        const attraction=await AttractionCollection.findById(req.params.id).populate([
            {
                path:"country",
                select:"name "
            },
            {
                path:"state",
                select:"name"
            },
            {
                path:"category",
                select:"name "
            },{
                path:"Review",
                select:"rating user comment",
                populate:{
                    path:"user",
                    select:"name image"
                }

            }
        ])
        return attraction?res.status(200).json({message:"success",attraction}):res.status(400).json({message:"attraction not found"})
    }
)
export const UpdateAttraction=AsyncHandeller(
    async(req,res,next)=>{
        const {name}=req.body
        const attraction=await AttractionCollection.findById(req.params.id)
        if(!attraction){
           return next(new Error("attraction not found",{cause:404}))
        }
        if(name){
            if(await AttractionCollection.findOne({name})){
                return next(new Error("attraction name already exist",{cause:404}))
            }
        }
        if(req.files.image){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.files.image[0].path,{folder:'Attraction'})
            req.body.image={path:secure_url,public_id}
            
        }
        if(req.files.images){
            const images=[]
            for(const element of req.files.images){
                const {secure_url,public_id}=await Cloud.uploader.upload(element.path,{folder:'Attraction'})
                images.push({path:secure_url,public_id})
            }
            req.body.images=images
        }
        const updatedAttraction=await AttractionCollection.findByIdAndUpdate(req.params.id,req.body,{new:true})
        return updatedAttraction?res.status(200).json({message:"success",updatedAttraction}):res.status(400).json({message:"attraction not updated"})
    }
)


export const SearchAttraction=AsyncHandeller(
    async(req,res,next)=>{
        let query=new ApiFeature(AttractionCollection.find().populate([{path:"country",select:"name"}]),req.query).Search()
        const attraction = await query
        return attraction?res.status(200).json({message:"success",length:attraction.length,attraction}):res.status(400).json({message:"attraction not found"})
    }
)