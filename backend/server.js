import express from "express"
import "dotenv/config"
import cors from "cors"
import http from "http"
import { Server } from "socket.io"
import { connectDB } from "./lib/db.js"
import userRouter from "./routes/userRoutes.js"
import messagerouter from "./routes/messageRoutes.js"

const app = express()
const server = http.createServer(app)

//init socket.io server
export const io = new Server(server,{
  cors:{origin:"*"}
})

//store online users
export const userSocketMap = {} //{userId:socketId}

//socketio connection handler
io.on("connection",(socket)=>{
  const userId = socket.handshake.query.userId;
  console.log("User connected ",userId);

  if(userId ) userSocketMap[userId] = socket.id

  //emit online users to all connected clients
  io.emit("getOnlineUsers",Object.keys(userSocketMap))

  //disconnect
  socket.on("disconnect",()=>{
    console.log("user disconnected ",userId);
    delete userSocketMap[userId]
    io.emit("getOnlineUsers",Object.keys(userSocketMap))
    
  })
})

//middleware
app.use(express.json({limit:"4mb"}))
app.use(cors())

//Routes setup
app.use("/api/status",(req,res)=>
    res.send("server is live")
)
app.use("/api/auth",userRouter)
app.use("/api/messages",messagerouter)
//connect to DB
await connectDB()





const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



