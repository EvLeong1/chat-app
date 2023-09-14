import React from 'react'

export const Search = () => {
  return (
    //search
    <div className='border-b border-white'>
      {/* searchform */}
      <div className='p-[0.625rem]'>
        <input type='text' placeholder='🔍︎ Find a user' className='border border-white rounded-full placeholder:text-white placeholder:text-opacity-70 text-white p-3 bg-transparent w-[100%] h-[30px] outline-none'></input>
      </div>
      {/* userChat */}
      <div className='p-[0.625rem] flex items-center gap-[0.625rem] text-white cursor-pointer hover:bg-[#ca5c5c] transition'>
        <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTjewye7WiL-oN2satiFIYXAjmodXWVy_dBWA&usqp=CAU" alt="" className='w-[3.125rem] h-[3.125rem] rounded-full object-cover'/>
        {/* userChatInfo */}
        <div>
          <span className='font-medium text-lg'>Username</span>
        </div>
      </div>
    </div>
  )
}

export default Search