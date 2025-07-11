
//get all users except the logged in one

import cloudinary from "../lib/cloudinary.js";
import MessageModel from "../models/Message.js";
import UserModel from "../models/User.js";
import {io,userSocketMap} from "../server.js"

export const getUSersForSidebar = async (req,res)=>{
    try {
        const userId = req.user._id;
        const filteredUser = await UserModel.find({_id:{$ne: userId }}).select("-password")

        //count msges which are not seen
        const unseenMessages  = {}
        const promises = filteredUser.map(async (user)=>{
            const messages = await MessageModel.find({senderId: user._id,receiverId:userId,seen:false})
            if(messages.length > 0){
                unseenMessages[user._id]= messages.length
            }
        }) 
        await Promise.all(promises)
        res.json({success:true,users:filteredUser,unseenMessages})

    } catch (error) {
        console.log(error.messages);
            res.json({success:false,message:error.message})
        
    }
}

//get all messages for selected user
export const getMessages =async (req,res)=>{
    try {
        const selectedUserId = req.params.id;
        const myId = req.user._id
        
        const messages = await MessageModel.find({
            $or:[
                {senderId:myId,receiverId:selectedUserId},
               {senderId:selectedUserId,receiverId:myId},

            ]
        })

        await MessageModel.updateMany({senderId:selectedUserId,receiverId:myId},
            {seen:true})
            
        res.json({success:true,messages})

    } catch (error) {
         console.log(error.messages);
            res.json({success:false,message:error.message})
    }
}

//api to mark msg as seen using message id
export const markMessageAsSeen  =async (req,res) =>{
try {
    const {id} = req.params;
    await MessageModel.findByIdAndUpdate(id,{seen:true})
    res.json({success:true})
} catch (error) {
     console.log(error.messages);
            res.json({success:false,message:error.message})
}
}

//send message to selected user
export const sendMessage = async(req,res)=>{
    try {
        const {text,image} = req.body;
        const receiverId = req.params.id
        const senderId = req.user._id

        let imageUrl;
        if(image){
           const uploadResponse = await cloudinary.uploader.upload(image)
           imageUrl = uploadResponse.secure_url

        }

        const newMessage  = await MessageModel.create({
            senderId,
            receiverId,
            text,
            image:imageUrl
        })

        //emit the new message to receiver'soscket
        const receiverSocketId = userSocketMap[receiverId]
        if(receiverSocketId){
            io.to(receiverSocketId).emit("newMessage",newMessage)
        }

        res.json({success:true,newMessage})

    } catch (error) {
        console.log(error.messages);
            res.json({success:false,message:error.message})
    }
}

