import { CategoryCollection } from "../../../../Db/Models/Category.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";


export const CreateCategory=AsyncHandeller(
    async(req,res,next)=>{
        req.body.user=req.user._id
        const {name}=req.body
        if(!name){
            return next(new Error("name not found",{cause:404}))
        }
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'Category'})
            req.body.image={path:secure_url,public_id}

        }
        const category=await CategoryCollection.create(req.body)
        return category?res.status(200).json({message:"success",category}):res.status(400).json({message:"category not created"})
    }
)

export const GetAllCategory=AsyncHandeller(
    async(req,res,next)=>{
        const category=await CategoryCollection.find()
        return category?res.status(200).json({message:"success",length:category.length,category}):res.status(400).json({message:"category not found"})
    }
)
export const GetSpecificCategory=AsyncHandeller(
    async(req,res,next)=>{
        const category=await CategoryCollection.find({_id:req.params.id})
        return category?res.status(200).json({message:"success",length:category.length,category}):res.status(400).json({message:"category not found"})
    }
)

export const UpdateCategory=AsyncHandeller(
    async(req,res,next)=>{
        const {name}=req.body
        const category=await CategoryCollection.findById(req.params.id)
        if(!category){
            return next(new Error("category not found",{cause:404}))
        }
        if(name){
            if(await CategoryCollection.findOne({name})){
                return next(new Error("category name already exist",{cause:404}))
            }
        }
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'Category'})
            req.body.image={path:secure_url,public_id}
        }
        const update=await CategoryCollection.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"success",update}):res.status(400).json({message:"category not updated"})
    
    }
)

export const DeletedCategory=AsyncHandeller(

    async(req,res,next)=>{
         console.log(req.params.id);
        const category=await CategoryCollection.findByIdAndDelete(req.params.id)
        return category?res.status(200).json({message:"success",category}):res.status(400).json({message:"category not deleted"})
    }
)