import { CategoryCollection } from "../../../../Db/Models/Category.js";
import { CountryCollection } from "../../../../Db/Models/Country.js";
import Cloud from "../../../Utils/Cloud.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";

export const CreateCountry = AsyncHandeller(
    async(req, res, next) => {
        req.body.user = req.user._id;
        const { name, typesOfTourism } = req.body;

        if (!name || await CountryCollection.findOne({ name })) {
            return next(new Error("please check name", { cause: 404 }));
        }
        if (typesOfTourism) {
            for (const element of typesOfTourism) {
                if (!await CategoryCollection.findById(element)) {
                    return next(new Error("please check type of tourism", { cause: 404 }));
                }
            }
        }
        // Check if type of tourism is in Category schema or not
    
        if (req.files.flag) {
            const { secure_url, public_id } = await Cloud.uploader.upload(req.files.flag[0].path, { folder: 'Country' });
            req.body.flag = { path: secure_url, public_id };
        }
         const images=[]
        if (req.files.images) {
            for (const element of req.files.images) {
                const { secure_url, public_id } = await Cloud.uploader.upload(element.path, { folder: 'Country' });
                images.push({ path: secure_url, public_id });
            }
            req.body.images = images;
        }
        const country = await CountryCollection.create(req.body);
        return country? res.status(201).json({ message: "success", country }) : res.status(400).json({ message: "country not created" });
    }
);

export const GetAllCountry=AsyncHandeller(
    async(req,res,next)=>{
        const country=await CountryCollection.find().populate([
            {
                path:"typesOfTourism",
                select:"name image -_id"
                
            },{
                path:"states",
                select:"name image -_id"
            },{
                path:"popularFood",
                select:"name image -_id"
            }
        ])
        return country?res.status(200).json({message:"success",length:country.length,country}):res.status(400).json({message:"country not found"})
    }
)

export const GetSpecificCountry=AsyncHandeller(
    async(req,res,next)=>{
        const country=await CountryCollection.findById(req.params.id).populate([
            {
                path:"typesOfTourism",
                select:"name image -_id"
                
            }
        ])
        return country?res.status(200).json({message:"success",country}):res.status(400).json({message:"country not found"})
    }
)

export const GetHomeCountry=AsyncHandeller(
    async(req,res,next)=>{
        const country=await CountryCollection.find().select("name flag  numoftourist ")
        return country?res.status(200).json({message:"success",country}):res.status(400).json({message:"country not found"})
    }
)
export const UpdateCountry=AsyncHandeller(
    async(req,res,next)=>{
        const {name,typesOfTourism}=req.body
        const country=await CountryCollection.findById(req.params.id)
        if(!country){
            return next(new Error("country not found",{cause:404}))
        }
        if(name){
            if(await CountryCollection.findOne({name})){
                return next(new Error("country name already exist",{cause:404}))
            }
        }
        if(typesOfTourism){
            for(const element of typesOfTourism){
                if(!await CategoryCollection.findById(element)){
                    return next(new Error("please check type of tourism",{cause:404}))
                }
            }
        }
        if(req.files.flag){
            const {secure_url,public_id}=await Cloud.uploader.upload(req.files.flag[0].path,{folder:'Country'})
            req.body.flag={path:secure_url,public_id}
            
    }
    if(req.files.images){
        const images=[]
        for(const element of req.files.images){
            const {secure_url,public_id}=await Cloud.uploader.upload(element.path,{folder:'Country'})
        }
        req.body.images=images
    }
        const update=await CountryCollection.findByIdAndUpdate(req.params.id,req.body,{
            new:true,
            runValidators:true
        })
        return update?res.status(200).json({message:"success",update}):res.status(400).json({message:"country not updated"})

    })