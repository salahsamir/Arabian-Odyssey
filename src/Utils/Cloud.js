import cloudinary from 'cloudinary'
import path from 'path'
import { configDotenv } from 'dotenv'
configDotenv({path:path.resolve('config/.env')})
cloudinary.v2.config({
      cloud_name: "dvzvx4m3t",
  api_key: "721631396576469",
  api_secret: "8hdoqieMdtulyw4C9YABJD-fhYQ",
  secure: true
})
export default cloudinary.v2