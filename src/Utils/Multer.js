import multer from 'multer'
const list=['image/png','image/jpeg']
export const UploadImage=()=>{
    const storage=multer.diskStorage({})
    const file_filter=(req,file,cb)=>{
     if(list.includes(file.mimetype)){
        return  cb(null,true)
     }else{
        cb(new Error('invalid_extinsion'),false)
     }
    }

   const upload=multer({file_filter,storage})
   return upload
}