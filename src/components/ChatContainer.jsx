import React, { useEffect, useRef } from 'react'
import assets, { messagesDummyData } from '../assets/assets'
import { formatMsgTime } from '../lib/utils'

const ChatContainer = ({selectedUser,setSelectedUser}) => {
    
    const scrollEnd = useRef()

    useEffect(()=>{
         
       const timer = setTimeout(() => {
        if (scrollEnd.current) {
            scrollEnd.current.scrollIntoView({behavior:"smooth"});
        }
    }, 10);  // Very small delay
    
    return () => clearTimeout(timer);

    },[selectedUser])

    return selectedUser ? (
    <div className='h-full overflow-scroll relative backdrop-blur-lg'>
        {/* header  */}
        <div className='flex items-center gap-3 py-3 mx-4 border-b
        border-stone-500'>
            <img className='w-8 rounded-full' src={assets.profile_martin} alt="" />
        <p className='flex-1 text-lg text-white gap-2 flex  items-center'>
            Martin johnson
            <span className='w-2 h-2 bg-green-500 rounded-full '></span>
            </p>
        <img onClick={()=>setSelectedUser(null)} src={assets.arrow_icon} className='md:hidden max-w-7' alt="" />
       <img src={assets.help_icon} className='max-w-5 max-md:hidden' alt="" />
        </div>
        {/* chat area  */}

        <div className='flex flex-col h-[calc(100%-120px)] 
        overflow-y-scroll p-3 pb-6'>
            {messagesDummyData.map((msg,index)=>(
                <div className={`flex items-end gap-2 justify-end ${msg.senderId !=='680f50e4f10f3cd28382ecf9' && 'flex-row-reverse'}`} key={index}>
                    {msg.image ? (
                        <img 
                        className='max-w-[230px] border border-gray-700 rounded-lg overflow-hidden mb-8' src={msg.image} alt="" />
                    ) : (
                        <p className={`p-2 max-2-[200px] md:text-sm font-light
                            rounded-lg mb-8 break-all bg-violet-500/30 text-white ${msg.senderId === '680f50e4f10f3cd28382ecf9' ? 'rounded-br-none':'rounded-bl-none'}`}
                        >{msg.text}</p>
                    )}

                    <div className='text-center text-xs'>
                    <img src={msg.senderId === '680f50e4f10f3cd28382ecf9' ? assets.avatar_icon : assets.profile_martin} 
                    className='rounded-full w-7'
                    alt="" />
                    <p className='text-gray-500'>{formatMsgTime(msg.createdAt)}</p>
                    </div>

                </div>
            ))}
            <div ref={scrollEnd}></div>
        </div>           

        {/* bottom area  */}
        <div className='absolute bottom-0 left-0 right-0 flex items-center gap-3 p-3'>
            <div className='flex-1 flex items-center bg-gray-100/12 rounded-full 
            py-0.5 px-3'>
            <input 
            className='flex-1 text-sm p-3 border-none rounded-lg outline-none text-white placeholder-gray-400'
             type="text" placeholder='Send a message' />
            <input type="file" id='image' accept='image/png,image/jpeg' hidden/>
            <label htmlFor="image">
                <img src={assets.gallery_icon} className='cursor-pointer w-5 mr-2' alt="" />
            </label>
            </div>
            <img src={assets.send_button} className='w-7 cursor-pointer' alt="" />
        </div>

    </div>
  ) : (
    <div className='flex flex-col items-center justify-center gap-2 text-gray-500 bg-white/15 max-md:hidden'> 
        <img src={assets.logo_icon} className='max-w-16' alt="" />
        <p className='text-lg font-medium text-white'>Chat anytime. anywhere</p>
    </div>
  )
}

export default ChatContainer