import React from 'react'
import "../style.scss"

export const Message = () => {
  return (
    <div className='flex gap-[1.3rem] mb-[1.3rem] message owner'>
      <div className='flex flex-col text-gray-400 text-sm'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjewye7WiL-oN2satiFIYXAjmodXWVy_dBWA&usqp=CAU" alt="" className='w-[3rem] h-[3rem] rounded-full object-cover'/>
        <span>Just Now</span>
      </div>
      <div className='max-w-[80%] flex flex-col gap-[0.625rem] msgContent'>
        <p className='bg-white px-[1.25rem] py-[0.625rem] rounded-tl-none rounded-lg	max-w-max'>hello</p>
        <img src="https://i.redd.it/3yf1hkhbmgt61.png" alt="" className='w-[50%]'/>
      </div>
    </div>
  )
}

export default Message