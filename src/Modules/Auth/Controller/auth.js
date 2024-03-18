import { customAlphabet } from "nanoid";
import { UserCollection } from "../../../../Db/Models/User.js";
import { Compare, Hash } from "../../../Utils/Bcrypt.js";
import { AsyncHandeller } from "../../../Utils/ErrorHandling.js";
import sendEmail from "../../../Utils/SendEmail.js";
import { GenerateToken, VerifyToken } from "../../../Utils/Token.js";
 const nanoid=customAlphabet('1234567890',4)
export const SignUp = AsyncHandeller(async (req, res, next) => {
  const { email, password } = req.body;
  if (await UserCollection.findOne({ email })) {
    return next(new Error("user already exist", { cause: 404 }));
  }
 const token = GenerateToken({ email });
 const link = `${req.protocol}://${req.headers.host}/auth/verify/${token}`;

  const Email = await sendEmail({
    subject: "welcome",
    to: email,
     html: `<!DOCTYPE html>
    <html>
    <head>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
    <style type="text/css">
    body{background-color: #88BDBF;margin: 0px;}
    </style>
    <body style="margin:0px;"> 
    <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
    <tr>
    <td>
    <table border="0" width="100%">
    <tr>
    <td>
    <h1>
        <img width="100px" src="${process.env.websiteImage}"/>
    </h1>
    </td>
    <td>
    <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
    <tr>
    <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
    <img width="50px" height="50px" src="${process.env.logo}">
    </td>
    </tr>
    <tr>
    <td>
    <h1 style="padding-top:25px; color:#630E2B">Confirm Your Email</h1>
    </td>
    </tr>
    <tr>
    <td>
   
    </td>
    </tr>
    <tr>
    </tr>
    <tr>
    </tr>
    <tr>
    <td>
    <h1>Email Confirmation</h1>
    <p>Please click the button below to confirm your email address:</p>
    <a class="button"  href=${link}>Confirm Email</a>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    <tr>
    <td>
    <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
    <tr>
    <td>
    <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
    </td>
    </tr>
    <tr>
    <td>
    <div style="margin-top:20px;">

    <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
    
    <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
    </a>
    
    <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
    <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
    </a>

    </div>
    </td>
    </tr>
    </table>
    </td>
    </tr>
    </table>
    </body>
    </html>`,
  });
  if (!Email) {
       return next(new Error("email not send", { cause: 404 }));
  }
  const hash =Hash({value:password})
  req.body.password = hash;
  // console.log(req.body)
  const user = await UserCollection.create(req.body);
  return user
    ? res
        .status(201)
        .json({ message: "success", confirem: "please: check your email and confirem" })
    : res.status(400).json({ message: "user not created" });
});

export const ConfiremEmail = AsyncHandeller(async (req, res, next) => {
  const { token } = req.params;
  const { email } = VerifyToken(token);
  const verify = await UserCollection.findOneAndUpdate(
    { email },
    { isConfiremed: true },
    { new: true }
  );
  return verify
  ///ToDo login page
    ? res.redirect("http://localhost:3000/login")
    : res.status(400).json({ message: "user not verify" });
});

export const SignIn = AsyncHandeller(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await UserCollection.findOne({ email });
  if (!user) {
    return next(new Error("email not exist ", { cause: 404 }));
  }
  if(user.isConfiremed===false){
    return next(new Error("please confirem your email ", { cause: 404 }));
  }
  if (!Compare({ value:password, hash: user.password })) {
    return next(new Error("password not match ", { cause: 404 }));
  }
  const token = GenerateToken({ email, Role: user.Role, id: user._id });
  user.status = "Online";
  return res.status(200).json({ message: "success", token });
});
// ////check email and send code  for forget password
export const SendEmail=AsyncHandeller(async(req,res,next)=>{
    const {email}=req.body
    const user=await UserCollection.findOne({email})
    if(!user){
        return next(new Error("user not found",{cause:404}))
    }
    const Code=nanoid()
    const token=GenerateToken({email,Code})
    const link=`${req.protocol}://${req.headers.host}/auth/checkCode/${token}`
    const Email=await sendEmail({
        subject:"forget password",
        to:email,
        html: `<!DOCTYPE html>
        <html>
        <head>
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"></head>
        <style type="text/css">
        body{background-color: #88BDBF;margin: 0px;}
        </style>
        <body style="margin:0px;"> 
        <table border="0" width="50%" style="margin:auto;padding:30px;background-color: #F3F3F3;border:1px solid #630E2B;">
        <tr>
        <td>
        <table border="0" width="100%">
        <tr>
        <td>
        <h1>
            <img width="100px" src="https://res.cloudinary.com/ddajommsw/image/upload/v1670702280/Group_35052_icaysu.png"/>
        </h1>
        </td>
        <td>
        <p style="text-align: right;"><a href="http://localhost:4200/#/" target="_blank" style="text-decoration: none;">View In Website</a></p>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" cellpadding="0" cellspacing="0" style="text-align:center;width:100%;background-color: #fff;">
        <tr>
        <td style="background-color:#630E2B;height:100px;font-size:50px;color:#fff;">
        <img width="50px" height="50px" src="${process.env.logo}">
        </td>
        </tr>
        <tr>
        <td>
        <h1 style="padding-top:25px; color:#630E2B">Forget password</h1>
        </td>
        </tr>
        <tr>
        <td>
        <p style="padding:0px 100px;margin:10px 0px 30px 0px ">  your verfication code is
        </p>
        </td>
        </tr>
        <tr>
        </tr>
        <tr>
        </tr>
        <tr>
        <td>
        <p style="margin:10px 0px 30px 0px;border-radius:4px;padding:10px 20px;border: 0;color:#fff;background-color:#630E2B;">${Code}</p>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        <tr>
        <td>
        <table border="0" width="100%" style="border-radius: 5px;text-align: center;">
        <tr>
        <td>
        <h3 style="margin-top:10px; color:#000">Stay in touch</h3>
        </td>
        </tr>
        <tr>
        <td>
        <div style="margin-top:20px;">
    
        <a href="${process.env.facebookLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35062_erj5dx.png" width="50px" hight="50px"></span></a>
        
        <a href="${process.env.instegram}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group35063_zottpo.png" width="50px" hight="50px"></span>
        </a>
        
        <a href="${process.env.twitterLink}" style="text-decoration: none;"><span class="twit" style="padding:10px 9px;;color:#fff;border-radius:50%;">
        <img src="https://res.cloudinary.com/ddajommsw/image/upload/v1670703402/Group_35064_i8qtfd.png" width="50px" hight="50px"></span>
        </a>
    
        </div>
        </td>
        </tr>
        </table>
        </td>
        </tr>
        </table>
        </body>
        </html>`,

              }
    
    )
    return res.status(200).json({message:"success",alert:"check your email",token})
})
// // checkCode
export const CheckCode=AsyncHandeller(async(req,res,next)=>{
    const {token}=req.params
    const {code}=req.body
    const {Code,email}=VerifyToken(token)
    if(code!=Code){
        return next(new Error("code not match",{cause:404}))
    }
   return res.status(200).json({message:"success",token})
})

// // update password
export const updatePassword=AsyncHandeller(async(req,res,next)=>{
    const {token}=req.params
    const {password}=req.body
    const {email}=VerifyToken(token)
    const hash=Hash({value:password})
    const reset=Date.now()/1000
    const user=await UserCollection.findOneAndUpdate({email},{password:hash,reset},{new:true})
    return res.status(200).json({message:"success",user})
})
