import { createContext, useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import toast from "react-hot-toast";

export const ChatContext = createContext()

export const ChatProvider = ({children})=>{

    const [messages,setMessages] = useState([]);
    const [users,setUsers] = useState([])
        const [selectedUser,setSelectedUser] = useState(null)
        const [unseenMessages,setUnseenMessages] = useState({})

        const {socket,axios} = useContext(AuthContext)

        //function to get all users

        const getUsers =async() =>{
            try {
             const {data} = await axios.get("/api/messages/users")

                if (data.success) {
                    setUsers(data.users)
                    setUnseenMessages(data.unseenMessages)
                }
                

            } catch (error) {
                toast.error(error.message)
            }
        }

        //function to get messages for selected user

        const getMessages = async(userId)=>{
            try {
               const {data} =  await axios.get(`/api/messages/${userId}`)
               if(data.success){
                setMessages(data.messages)
               }
            } catch (error) {
                toast.error(error.message)
            }
        }

        //function to send message to selected user

        const sendMessage = async (messageData)=>{
            try {
                const {data} = await axios.post(`/api/messages/send/${selectedUser._id}`,messageData)
                
                if (data.success) {
                    setMessages((prevMessages)=>[...prevMessages,data.newMessage])
                }
                else {
                    toast.error(data.message)
                }
           
            } catch (error) {
                toast.error(error.message)
            }
        }

        //fnc to subscribe to messages for selected user

        const subscribeToMessages = async ()=>{
            if(!socket) return;

            socket.on("newMessage",(newMessage)=>{
                if (selectedUser && newMessage.senderId === selectedUser._id) {
                    newMessage.seen = true;
                    setMessages((prevMessages)=> [...prevMessages,newMessage])
                    axios.put(`/api/messages/mark/${newMessage._id}`)
                }
                else{
                    setUnseenMessages((prevUnseenMessages) => {
                      const updatedUnseenMessages = { ...prevUnseenMessages };
                      if (updatedUnseenMessages[newMessage.senderId]) {
                        updatedUnseenMessages[newMessage.senderId] += 1;
                      } else {
                        updatedUnseenMessages[newMessage.senderId] = 1;
                      }
                      return updatedUnseenMessages;
                    });
                }
            })
        }

        //func to unsubscribe from messages
        const unSubscribeFromMessages = ()=>{
            if(socket) socket.off("newMessage")
        }

        useEffect(()=>{
            subscribeToMessages()
            return ()=> unSubscribeFromMessages()
        },[socket,selectedUser])

    value = {
        messages,
        users,
        selectedUser,
        getUsers,
        setMessages,
        sendMessage,
        setSelectedUser,unseenMessages,setUnseenMessages
    }
 
    return (
        <ChatContext.Provider value ={value}>
            {children}
        </ChatContext.Provider>
    )
}