import joi from 'joi'
import { generalFields } from '../../middleware/Validtions.js'


export const UpdatePassword = joi.object({

    oldPassword: generalFields.password,
    password: generalFields.password,
    cPassword: generalFields.cpassword
})