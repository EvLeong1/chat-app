import React from 'react'
import Messages from '../components/messages'
import Input from '../components/input'
import add from '../img/add.png'
import more from '../img/more.png'
import cam from '../img/cam.png'


export const Chat = () => {
  return (
    <div className='w-[66%] bg-red-100'>
      <div className='h-[3.125rem] bg-[#dd5353] flex items-center justify-between p-[0.625rem] text-gray-200'>
        <span>Username</span>
        {/* div for icons v */}
        <div className='flex gap-[0.625rem]'>
          <img src={cam} alt="" className='h-[1.5rem] cursor-pointer'/>
          <img src={add} alt="" className='h-[1.5rem] cursor-pointer'/>
          <img src={more} alt="" className='h-[1.5rem] cursor-pointer'/>
        </div>
      </div>
      <Messages/>
      <Input/>
    </div>
  )
}

export default Chat