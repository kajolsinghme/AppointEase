import multer from "multer";
import cloudinary from "../utils/cloudinary/cloudinary.js";
import { CloudinaryStorage } from "multer-storage-cloudinary";


const storage = new CloudinaryStorage({
    cloudinary,
    params: {
        folder: "user_profiles",
        allowed_formats: ['jpg', 'jpeg', 'png'],
        transformations: [{width: 500, height: 500, crop: "limit"}]
    }
})

const upload = multer({storage})

export default upload;