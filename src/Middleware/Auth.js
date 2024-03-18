import { UserCollection } from "../../Db/Models/User.js";
import { AsyncHandeller } from "../Utils/ErrorHandling.js";
import { VerifyToken } from "../Utils/Token.js";

export const Roles={admin:'Admin',user:'User'}
export const AuthMiddleware=(Role)=>{
    return AsyncHandeller(async(req,res,next) => {
        const {token}=req.headers;
        if(!token){
            return next(new Error('token not found ,please Login ',{cause:404}))
        } 
        if( !token.startsWith(process.env.Bearer)){
            return next(new Error('Bearer key not valid',{cause:404}))
        }
       const auth=token.split(process.env.Bearer)[1]
       const {id,iat}=VerifyToken(auth)
       const user=await UserCollection.findOne({_id:id,isDeleted:false})
       if(!user){
        return next(new Error(' this account not exist',{cause:404}))
       }
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