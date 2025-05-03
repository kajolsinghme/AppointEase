import express from "express";
import upload from "../middlewares/multer.js";

const router = express.Router()

router.post("/upload", upload.single("image"),(req,res) => {
    try{
        return res.status(200).json({
            message: "Upload successful",
            imageUrl: req.file.path
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({error: "Image upload failed"})
    }
})

export default router