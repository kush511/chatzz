import { createContext } from "react";

export const ChatContext = createContext()

export const ChatProvider = ({children})=>{

    

    value = {

    }

    return (
        <ChatContext.Provider value ={value}>
            {children}
        </ChatContext.Provider>
    )
}