import { CategoryCollection } from "../../../../Db/Models/Category.js";
import { SubCategoryCollection } from "../../../../Db/Models/SubCategory.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";

export const CreateSubCategory=AsyncHandeller(
    async(req,res,next)=>{
        const {name,image}=req.body
        
        const {id}=req.params
        if(!await CategoryCollection.findById(id)){
            return next(new Error("category not found",{cause:400}))
        }
        if(await SubCategoryCollection.findOne({name})){
            return next(new Error("subcategory already exist",{cause:400}))

        }
        const newSubCategory=await SubCategoryCollection.create({name,image,category:id})
        return newSubCategory? res.status(201).json({message:"done",newSubCategory}):next(new Error("subcategory not created"))
    }
)
export const GetSubCategories=AsyncHandeller(
    async(req,res,next)=>{
        
        const subcategories = await SubCategoryCollection.find({isDeleted:false});
        return subcategories? res.status(200).json({message:"done",subcategories}):next(new Error("subcategories not found"))
    }
)
export const GetSpecialSubCategory=AsyncHandeller(
    async(req,res,next)=>{
        const {id}=req.params
        const subcategory=await SubCategoryCollection.findOne({category:id})
        return subcategory? res.status(200).json({message:"done",subcategory}):next(new Error("subcategory not found"))
    }

)
export const UpdateSubCategory=AsyncHandeller(
    async(req,res,next)=>{
        const {id}=req.params
        const {name,image}=req.body
        if(await SubCategoryCollection.findOne({name})){
            return next(new Error("subcategory already exist",{cause:400}))
        }
        const subcategory=await SubCategoryCollection.findByIdAndUpdate(id,req.body,{new:true})
        return subcategory? res.status(200).json({message:"done",subcategory}):next(new Error("subcategory not updated"))
    }

)
export const DeleteSubCategory=AsyncHandeller(
    async(req,res,next)=>{
        const {id}=req.params
        const subcategory=await SubCategoryCollection.findOne({_id:id})
        if(!subcategory){
            return next(new Error("subcategory not found",{cause:400}))
        }
        const deletedSubCategory=await SubCategoryCollection.findByIdAndUpdate(id,{isDeleted:true},{new:true})
        return deletedSubCategory? res.status(200).json({message:"done",deletedSubCategory}):next(new Error("subcategory not deleted"))
    }
)