  import bcrypt from "bcryptjs"

  export const Hash=({value,salt}={value,salt:process.env.salt})=>{
    return bcrypt.hashSync(value,salt)
  }
  export const Compare=({value,hash})=>bcrypt.compareSync(value,hash)