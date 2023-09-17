import React from 'react'
import Messages from '../components/messages'
import Input from '../components/input'
import add from '../img/add.png'
import more from '../img/more.png'
import cam from '../img/cam.png'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'


export const Chat = () => {

  const {data} = useContext(ChatContext);

  return (
    <div className='w-[66%] bg-red-100'>
      <div className='h-[3.125rem] bg-[#dd5353] flex items-center justify-center gap-[10px] p-[0.625rem] text-gray-200'>
        {data.user?.photoURL && <img src={data.user?.photoURL} alt="" className='w-[2.5rem] h-[2.5rem] rounded-full object-cover'/>}
        <span className='font-bold text-white'>{data.user?.displayName || 'Please Select a User'}</span>
        {/* div for icons v */}
        <div className='flex gap-[0.625rem] ml-auto'>
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