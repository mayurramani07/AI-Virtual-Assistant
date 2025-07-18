const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const genToken = require("../config/token");


const signUp = async(req,res) => {
    try{
        const{name,email,password} = req.body

        const existEmail = await User.findOne({email})
        if(existEmail) {
            return res.status(400).json({message:"email already exists !"})
        }

        if(password.length < 6) {
            return res.status(400).json({message:"Password must be atleast 6 characters !"})
        }

        const hashedPassword = await bcrypt.hash(password,10)

        const user = await User.create({
            name,password:hashedPassword,email
        })
        const token = await genToken(user._id)
        res.cookie("token",token,{
            httpOnly : true,
            maxAge : 7*24*60*60*1000,
            sameSite:"strict",
            secure:false
        })

        return res.status(201).json(user)
        
    } catch(error) {
        return res.status(500).json({message:`signup error ${error}`})

    }
}