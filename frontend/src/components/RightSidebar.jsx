import React, { useContext, useEffect, useState } from 'react'
import assets, { imagesDummyData } from '../assets/assets'
import { ChatContext } from '../../context/chatContext'
import { AuthContext } from '../../context/AuthContext'

const RightSidebar = () => {

 


  return selectedUser && (
    <div className={`text-white w-full relative overflow-y-scroll bg-[#8185B2]/10
   ${selectedUser ? "max-md:hidden" :" "} `}>

      <div className='pt-16 flex flex-col items-center gap-2 
      text-xs font-light mx-auto'>
        <img src={selectedUser?.profilePic || assets.avatar_icon}
        className='w-20 aspect-[1/1] rounded-full' alt="" />
        <h1 className='px-10 text-xl font-medium mx-auto flex items-center gap-2'>
          <p className='rounded-full bg-green-500 h-2 w-2'></p>
          {selectedUser.fullName}
          </h1>
      <p className='px-10 mx-auto'>{selectedUser.bio}</p>
      </div>

      <hr className='border-[#ffffff50] my-4'/>
      <div className='px-5 text-xs'>
        <p>Media</p>
        <div className='mt-2 max-h-[200px] overflow-y-scroll grid grid-cols-2 gap-4
        opacity-80'>
          {imagesDummyData.map((url,index)=>(
            <div key={index} onClick={()=> window.open(url)}
            className='cursor-pointer rounded'>
              <img src={url} 
              className='h-full rounded-md' alt="" />
            </div>
          ))}
        </div>
      </div>
      <button className='bottom-5 absolute left-1/2 transform -translate-x-1/2 
      bg-gradient-to-r from-purple-400 to-violet-600 text-white border-none
      text-sm font-light py-2 px-20 rounded-full cursor-pointer'>
        Logout
      </button>
    </div>
  )
}

export default RightSidebar