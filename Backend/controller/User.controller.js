import { User } from "../model/User.schema.js";
import bcrypt from"bcryptjs"
import jwt from "jsonwebtoken"

export const signUp = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (
      [name, email, password].some(
        (item) => typeof item !== "string" || item.trim().length === 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    const isUserExisted=await User.findOne({email})

    if(isUserExisted){
        return res.status(400).json({
            success:false,
            message:"User Already Exist"
        })
    }

    const hashedPassword=await bcrypt.hash(password,8)

    let user=await User.create({
        name,
        email,
        password:hashedPassword
    })

    let token=jwt.sign({userId:user._id},process.env.JWT_SECRET,{expiresIn:"4d"})

    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"None",
        secure:true,
        maxAge:4*24*60*60*1000
    } )

    user.password=undefined

    return res.status(201).json({
        success:true,
        user,
        message:"User Registerd successfully"
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `signUp: ${error.message}`,
    });
  }
};

export const login = async (req, res) => {
  try {

    const {email,password}=req.body
     if (
      [ email, password].some(
        (item) => typeof item !== "string" || item.trim().length === 0
      )
    ) {
      return res.status(400).json({
        success: false,
        message: "All fields required",
      });
    }

    let userExist=await User.findOne({email})

    if(!userExist){
        return res.status(401).json({
        success: false,
        message: "User does not exist",
      });
    }

    let comparedPassword=await bcrypt.compare(password,userExist.password)
    if (!comparedPassword) {
      return res.status(401).json({
        success: false,
        message: "Incorrect Password",
      });
    }

    const token=jwt.sign({userId:userExist._id},process.env.JWT_SECRET,{expiresIn:"4d"})
    res.cookie("jwt",token,{
        httpOnly:true,
        sameSite:"None",
        secure:true,
        maxAge:4*24*60*60*1000
    })

    userExist.password=undefined

    return res.status(200).json({
        success:true,
        message:"User loggedIn successfully",
        user:userExist
    })

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `login: ${error.message}`,
    });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt",{
        httpOnly:true,
        sameSite:"None",
        secure:true
    })

    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: `logout: ${error.message}`,
    });
  }
};
