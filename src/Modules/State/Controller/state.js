import { CountryCollection } from "../../../../Db/Models/Country.js";
import { StateCollection } from "../../../../Db/Models/State.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";


export const CreateState=AsyncHandeller(
    async(req,res,next)=>{
        req.body.user=req.user._id
        const {country}=req.body
        if(!country){
            return next(new Error("country not found",{cause:404}))
        }
        if(!await CountryCollection.findById(country)){
            return next(new Error(" country not exist",{cause:404}))
        }
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'State'})
            req.body.image={path:secure_url,public_id}
        }
        const state=await StateCollection.create(req.body)
        return state?res.status(200).json({message:"success",state}):res.status(400).json({message:"state not created"})

    }
)

export const GetAllState=AsyncHandeller(
    async(req,res,next)=>{
        const state=await StateCollection.find().sort({name:1})
        return state?res.status(200).json({message:"success",length:state.length,state}):res.status(400).json({message:"state not found"})
    }
)

export const GetSpecificState=AsyncHandeller(
    async(req,res,next)=>{
        const state=await StateCollection.findById(req.params.id).populate([{
            path:"attractions",
            select:"name image  desc"
        }])
        return state?res.status(200).json({message:"success",state}):res.status(400).json({message:"state not found"})
    }
)
export const UpdateState=AsyncHandeller(
    async(req,res,next)=>{
        const {name}=req.body
        const state=await StateCollection.findById(req.params.id)
        if(!state){
            return next(new Error("state not found",{cause:404}))
        }
        if(name){
            if(await StateCollection.findOne({name})){
                return next(new Error("state name already exist",{cause:404}))
            }
        }
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'State'})
            req.body.image={path:secure_url,public_id}
        }
        const update=await StateCollection.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"success",update}):res.status(400).json({message:"state not updated"})

    }
)