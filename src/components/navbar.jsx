import React from 'react'

export const Navbar = () => {
  return (
    <div>
      <span className='font-bold text-xl text-white px-[15px] py-[5px] bg-red-300 rounded-lg w-[40%]'>Lard Chat</span>
      <div>
        <img src='' alt=''></img>
        <span>Username</span>
        <button>Logout</button>
      </div>
    </div>
    
  )
}

export default Navbar