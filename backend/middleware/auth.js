import UserModel from "../models/User.js";
import jwt from "jsonwebtoken"
//protect routess
export const protectRoute = async (req,res,next)=>{
    try {
        const token = req.headers.token;
        const decoded = jwt.verify(token,process.env.JWT_SECRET)

        const user = await UserModel.findById(decoded.userId).select("-password")

        if(!user){
            return res.json({success:false,
                message:"User not found"
            })
        }
        req.user = user;
        next()
    } catch (error) {
        console.log(error.message);
        
        res.json({success:false,
                message:error.message
            })
    }
}