import { User } from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const registerUser = async(req, res) => {
    try{
        const {name, email, password, role} = req.body;
        
        let existingUser = await User.findOne({email})

        if(existingUser){
            return res.status(400).json({success: false, message: "User already exists"})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password,salt)
        
        const newUser = new User({
            name,
            email,
            password: hashedPassword,
            role
        })

        await newUser.save()
        res.status(201).json({success: true, message: "User registered successfully", data: {id: newUser._id}})
    }
    catch(error){
        res.status(500).json({success: false, message: "Internal Server Error", error: error})
    }
}

export const loginUser = async(req, res) => {
    try{
        const {email, password} = req.body

        // Check if user exists
        const user = await User.findOne({email})

        if(!user){
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }

        // Compare passwords
        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch){
            return res.status(401).json({success: false, message: "Invalid credentials"})
        }

        // Generate JWT Token
        const token = jwt.sign(
            {userId: user._id, role: user.role},
            process.env.JWT_SECRET,
            {expiresIn: "2d"}
        )

        res.status(200).json({success: true, message: "Login successful", token})
    }
    catch(error){
        res.status(500).json({ success: false, message: "Internal Server Error", error: error.message });
    }
}