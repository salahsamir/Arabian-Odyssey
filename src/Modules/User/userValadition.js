import joi from 'joi'
import { generalFields } from '../../Middleware/Validtions.js'


export const UpdatePassword = joi.object({

    oldpassword: generalFields.password,
    password: generalFields.password,
    cpassword: generalFields.cpassword
})