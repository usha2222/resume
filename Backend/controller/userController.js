import User from '../models/User.js'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import Resume from '../models/Resumes.js'
const generateToken = (userId) => {
    const token = jwt.sign({ userId }, process.env.JWT_SECRETE, { expiresIn: '7d' })
    return token;
}
//controller for user regsitration 
//api/user/register
export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        //check if required field are present
        if (!name || !email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }

        //check if user already exist
        const user = await User.findOne({ email })
        if (user) {
            return res.status(400).json({ success: false, message: "User Already Exist" })
        }
        //create new user
        const hashPassword = await bcrypt.hash(password, 10);
        const newUser = await User.create({
            name,
            email,
            password: hashPassword
        })

        //return success message
        const token = generateToken(newUser._id)
        newUser.password = undefined

        return res.status(201).json({ success: true, message: "User Created Successfully", token, user: newUser })


    }
    catch (error) {
        return res.status(500).json({ success: false, message: error.message, })

    }
}

//controller for user login 
//api/user/login
export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        //check if required field are present
        if (!email || !password) {
            return res.status(400).json({ success: false, message: "All fields are required" })
        }
        //check if user  exist
        const user = await User.findOne({ email })

        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" })
        }

        //compare password
        const comparePassword = await bcrypt.compare(password, user.password)
        if (!comparePassword) {
            return res.status(400).json({ success: false, message: "Invalid Password" })
        }
        //return success message
        const token = generateToken(user._id)
        user.password = undefined

        return res.status(200).json({ success: true, message: "Login Successfully", token, user: user })
    }


    catch (error) {
        return res.status(500).json({ success: false, message: error.message, })
    }
}



//controller for getting user by ID 
//api/user/data
export const getUserById = async (req, res) => {
    try {
        const userId = req.userId

        //check if user  exist
        const user = await User.findById(userId)
        if (!user) {
            return res.status(400).json({ success: false, message: "User Not Found" })
        }
        //return user

        return res.status(200).json({ success: true,message: "User Found", user })

    } catch (error) {
        return res.status(500).json({ success: false, message: error.message, })

    }
}

//controller for getting user resumes
//api/user/resumes
export const getUserResumes=async(req,res)=>{
try{
    //user user resumes
    const userId=req.userId
    const resume=await Resume.find({userId})
    return res.status(200).send({success:true,resume:resume,message:"User resumes"})

}
catch (error) {
        return res.status(500).json({ success: false, message: error.message, })

    }
}
export default {loginUser,registerUser,getUserById,getUserResumes}