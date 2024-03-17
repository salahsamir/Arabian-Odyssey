import joi from "joi";
import { Types } from "mongoose";
const validateObjectId = (value, helper) => {

  return Types.ObjectId.isValid(value)
    ? true
    : helper.message("In-valid objectId");
};
export const generalFields = {
  name: joi.string().alphanum().min(3).max(30).required(),
  email: joi
    .string()
    .email({
      minDomainSegments: 2,
      maxDomainSegments: 4,
      tlds: { allow: ["com", "net"] },
    })
    .required(),
  password: joi
    .string()
    .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
    .required()
    .messages({
      "string.pattern.base": "invalid password",
    }),
  cpassword: joi.string().valid(joi.ref("password")).messages({
    'any.only': 'Confirm password must match the password field.',
}),
  age: joi.number().min(15).max(100).required(),
  id: joi.string().custom(validateObjectId).required(),
  file: joi.object({
    size: joi.number().positive().required(),
    path: joi.string().required(),
    filename: joi.string().required(),
    destination: joi.string().required(),
    mimetype: joi.string().required(),
    encoding: joi.string().required(),
    originalname: joi.string().required(),
    fieldname: joi.string().required(),
  }),
};

export const Validation_Middleware = (schema) => {
  return (req, res, next) => {
    const inputs = { ...req.query, ...req.params, ...req.body };
    if (req.file || req.files) {
      inputs.file = req.file || req.files;
    }
    const validate = schema.validate(inputs, { abortEarly: false });
    if (validate.error?.details) {
      return res
        .status(400)
        .json({ message: "validation error", err: validate.error.details });
    }
    return next();
  };
};
