import joi from 'joi';
import { generalFields } from '../../Middleware/Validtions.js';

export const signup=joi.object({
    email:generalFields.email,
    password:generalFields.password,
    cpassword:generalFields.cpassword,
    name:joi.string().min(3).max(30).required(),
    age:joi.number().min(15).max(100),
    gender:joi.string().valid("male","female"),
    

})

export const confiremEmail=joi.object({
    token:joi.string().required()
})

export const signin=joi.object({
    email:generalFields.email,
    password:generalFields.password,


})

export const email=joi.object({
    email:generalFields.email
})
export const code=joi.object({
    code:joi.number().min(1000).max(9999).required(),
    token:joi.string().required()
})
export const password=joi.object({
    password:generalFields.password,
    cpassword:generalFields.cpassword,
    token:joi.string().required()


})