import React, { useEffect, useRef } from 'react'
import "../style.scss"
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'




export const Message = ({message}) => {


  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  // console.log("message date "+message.date.toDate().getHours()+":"+message.date.toDate().getMinutes());

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({behavior:"smooth"});
  }, [message]);

  
  return (
    <div className={`flex gap-[1.3rem] mb-[1.3rem] message ${message.senderId === currentUser.uid && "owner"}`}>
      <div className='flex flex-col text-gray-400 text-sm items-center'>
        <img src={message.senderId === currentUser.uid ? currentUser.photoURL : data.user.photoURL} alt="" className='w-[3rem] h-[3rem] rounded-full object-cover'/>
        <span className='items-center'>{message.date.toDate().getHours()+":"+message.date.toDate().getMinutes()}</span>
      </div>
      <div className='max-w-[80%] flex flex-col gap-[0.625rem] msgContent'>
        <p className='bg-white px-[1.25rem] py-[0.625rem] rounded-tl-none rounded-lg	max-w-max'>{message.text}</p>
        {message.img && <img src={message.img} alt="" className='w-[50%]'/>}
      </div>
    </div>
  )
}

export default Message