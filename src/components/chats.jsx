import React from 'react'

export const Chats = () => {
  return (
    <div>
      <div className='p-[0.625rem] flex items-center gap-[0.625rem] text-white cursor-pointer hover:bg-[#ca5c5c] transition'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjewye7WiL-oN2satiFIYXAjmodXWVy_dBWA&usqp=CAU" alt="" className='w-[3.125rem] h-[3.125rem] rounded-full object-cover'/>
        {/* userChatInfo */}
        <div className='flex flex-col items-center'>
          <span className='font-medium text-lg'>Username</span>
          <p className='font-gray-300 font-light text-xs'>Latest Message</p>
        </div>
      </div>
    </div>
  )
}
export default Chats