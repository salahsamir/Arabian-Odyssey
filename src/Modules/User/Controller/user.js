import { UserCollection } from "../../../../DB/Collections/UserCollection.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeler } from "../../../Utils/Error.js";
import { Compare, Hash } from "../../../Utils/Hash&Compare.js";


export const getUser=AsyncHandeler(
    async(req,res,next)=>{
        const user=req.user;
        return user? res.status(200).json({message:"done",user}):next(new Error("user not found",{cause:404}))
    }
)


export const UpdateImage=AsyncHandeler(
    async(req,res,next)=>{
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'User'})
            req.body.image={path:secure_url,public_id}
            const user=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
                new:true,
                runValidators:true
            })
            return user?res.status(200).json({message:"done",user}):res.status(400).json({message:"user not updated"})
        }
    }
)

export const UpdatePassword=AsyncHandeler(
    async(req,res,next)=>{
        const {oldPassword,password}=req.body
        const user=req.user
        if(!Compare({password:oldPassword,hash:user.password})){
            return next(new Error("password not match",{cause:404}))
        }
      
       
        const hash=Hash({password:password})
        req.body.password=hash
        const update=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"done",update}):res.status(400).json({message:"user not updated"})
    }
)


///updaet 
export const UpdateUser=AsyncHandeler(
    async(req,res,next)=>{
        const update=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"done",update}):res.status(400).json({message:"user not updated"})
    }
)

//soft delete 
export const DeleteUser=AsyncHandeler(
    async(req,res,next)=>{
        req.body.isDeleted=true
        const deleteuser=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
            new:true,
            runValidators:true
        })
        return deleteuser?res.status(200).json({message:"done",deleteuser}):res.status(400).json({message:"user not deleted"})
    }
)