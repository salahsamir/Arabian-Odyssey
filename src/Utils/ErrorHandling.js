export const AsyncHandeller=(fn)=>{
    return (req,res,next)=>{
        fn(req,res,next).catch(error=>{
            return res.status(500).json({message:'error',error:error.message})
        })
    }
}
export const ErrorHandeller=(err,req,res,next)=>{
    if(err){
        return res.status(500||err.cause).json({message:"Error Handeller",err:err.message})
    }
    return res.status(500).json({message:"Error Handeller",err:err.message})
}