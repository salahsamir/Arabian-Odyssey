import { CategoryCollection } from "../../../../Db/Models/Category.js";
import { CountryCollection } from "../../../../Db/Models/Country.js";
import { FoodCollection } from "../../../../Db/Models/Food.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";
import { Logout } from "../../User/Controller/user.js";


export const AddFood=AsyncHandeller(
    async(req,res,next)=>{
        req.body.user=req.user._id

        if(req.body.country){
            if(!await CountryCollection.findById(req.body.country)){
                return next(new Error("country not found",{cause:404}))
            }
            
        }
        if(req.body.category){
            if(!await CategoryCollection.findById(req.body.category)){
                return next(new Error("category not found",{cause:404}))
            }
           
            
        }
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'Food'})
            req.body.image={path:secure_url,public_id}
        }
        const food=await FoodCollection.create(req.body)
        return food?res.status(200).json({message:"success",food}):res.status(400).json({message:"food not created"})

    }
)

export const GetAllFood=AsyncHandeller(
    async(req,res,next)=>{
        const food=await FoodCollection.find()
        return food?res.status(200).json({message:"success",length:food.length,food}):res.status(400).json({message:"food not found"})
    }
)

export const GetSpeficificFood=AsyncHandeller(
    async(req,res,next)=>{
        const food=await FoodCollection.findById(req.params.id)
        return food?res.status(200).json({message:"success",food}):res.status(400).json({message:"food not found"})
    }
)

export const UpdateFood=AsyncHandeller(
    async(req,res,next)=>{
        const {name}=req.body
        const food=await FoodCollection.findById(req.params.id)
        if(!food){
            return next(new Error("food not found",{cause:404}))
        }
        if(name){
            if(await FoodCollection.findOne({name})){
                return next(new Error("food name already exist",{cause:404}))
            }
        }
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'Food'})
            req.body.image={path:secure_url,public_id}
        }
        const update=await FoodCollection.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"success",update}):res.status(400).json({message:"food not updated"})

    }

)