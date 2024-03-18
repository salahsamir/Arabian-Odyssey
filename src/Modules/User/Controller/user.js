import { UserCollection } from "../../../../Db/Models/User.js";
import { Compare, Hash } from "../../../Utils/Bcrypt.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";


export const GetUser=AsyncHandeller(
    async(req,res,next)=>{
        const user=req.user;
        return user? res.status(200).json({message:"success",user}):next(new Error("user not found",{cause:404}))
    }
)
export const UpdateUser=AsyncHandeller(
    async(req,res,next)=>{
        const update=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"success",update}):res.status(400).json({message:"user not updated"})
    }
)
export const UploadImage=AsyncHandeller(
    async(req,res,next)=>{
        if(req.file){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.file.path,{folder:'User'})
            req.body.image={path:secure_url,public_id}
            const user=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
                new:true,
                runValidators:true
            })
            return user?res.status(200).json({message:"success",user}):res.status(400).json({message:"user not updated"})
        }
    }
)

export const UpdatePassword=AsyncHandeller(
    async(req,res,next)=>{
        const {oldpassword,password}=req.body
        const user=req.user
        if(!Compare({value:oldpassword,hash:user.password})){
            return next(new Error("password not match",{cause:404}))
        }       
        const hash=Hash({value:password})
        req.body.password=hash
        const update=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"success",update}):res.status(400).json({message:"user not updated"})
    }
)
export const Logout=AsyncHandeller(
    async(req,res,next)=>{
        const user=req.user
        user.status="Offline"
        user.reset=Date.now()/1000
        await user.save()
        return res.status(200).json({message:"success"})

    }
)
export const DeleteUser=AsyncHandeller(
    async(req,res,next)=>{
        req.body.isDeleted=true
        const deleteuser=await UserCollection.findByIdAndUpdate(req.user._id,req.body,{
            new:true,
            runValidators:true
        })
        return deleteuser?res.status(200).json({message:"success",deleteuser}):res.status(400).json({message:"user not deleted"})
    }
)