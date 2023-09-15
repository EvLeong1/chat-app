import React from 'react'
import attach from '../img/attach.png'
import img from '../img/img.png'

export const Input = () => {
  return (
    <div className='h-[4rem] bg-red-200 p-[0.625rem] flex flex-row items-center justify-between gap-3'>
        <input type="text" placeholder='Type a message...' className='bg-gray-100 rounded-full px-[1.25rem] py-[0.625rem] w-[80%] outline-none'/>
        <div className='flex items-center gap-[0.625rem]'>
          <img src={attach} alt="" className='h-[2rem] cursor-pointer p-1 bg-red-300 rounded-lg '/>
          <input type="file"  id="file" className='hidden '/>
          <label htmlFor="file" className='cursor-pointer'>
            <img src={img} alt="" className='h-[2rem] w-[2rem] cursor-pointer  p-1 bg-red-300 rounded-lg'/>
          </label>
          <button className='p-1 bg-green-400 rounded-lg text-white font-bold'>Send</button>
        </div>
    </div>
  )
}

export default Input