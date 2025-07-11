import express from "express"
import { protectRoute } from "../middleware/auth"
import { getMessages, getUSersForSidebar, markMessageAsSeen, sendMessage } from "../controllers/messageController"

const messageRouter = express.Router()

messagerouter.get("/users",protectRoute,getUSersForSidebar)
messagerouter.get("/:id",protectRoute,getMessages)
messagerouter.put("mark:/id",protectRoute,markMessageAsSeen)
messageRouter.post("/send/:id",protectRoute,sendMessage)
export default messageRouter