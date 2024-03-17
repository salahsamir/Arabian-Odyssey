import { UserCollection } from "../../DB/Collections/UserCollection.js";
import { AsyncHandeler } from "../Utils/Error.js";
import { VerifyToken } from "../Utils/Token.js";
export const Roles={admin:'Admin',user:'User'}
export const Auth=(Role)=>{
    return AsyncHandeler(async(req,res,next) => {
        const {auth}=req.headers;
        if(!auth){
            return next(new Error('data not right please sign in log in',{cause:404}))
        } 
        if( !auth.startsWith(process.env.Bearer)){
            return next(new Error('Bearer key not valid',{cause:404}))
        }
       const token=auth.split(process.env.Bearer)[1]
       const {id,iat}=VerifyToken(token)
    //    console.log(id);
       const user=await UserCollection.findById(id)
       if(!user){
        return next(new Error(' this account not exist',{cause:404}))
       }
    //    check token valid or not by reset
    // console.log(user.reset<Date.now(),iat,user.reset);
    if(user.reset>iat){
        return next(new Error('token not valid',{cause:404}))
    } 
   
       if(!Role.includes(user.Role)){
        return next(new Error('not authorized account',{cause:404}))
       }
       req.user=user
       return next()
    })
}