import React, { useContext } from 'react'
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import { AuthContext } from '../context/AuthContext';


export const Navbar = () => {
  const { currentUser } = useContext(AuthContext);

  return (
    <div className='flex flex-col sm:flex-row items-center bg-[#b44444] h-[3.125rem] p-[0.625rem] justify-between text-white'>
      <span className='font-bold text-xl text-white px-[0.625rem] py-[0.188rem] bg-green-300 rounded-md'>Lard Chat</span>
      <div className='flex flex-col sm:flex-row gap-[0.5rem] items-center justify-center'>
        <img src={currentUser.photoURL} alt='' className='bg-white h-7 w-7 rounded-full object-cover'></img>
        <span className='flex font-medium'>{currentUser.displayName}</span>
        <button className='p-1 bg-gray-300 text-red-800 text-xs border-none cursor:pointer rounded-sm hover:scale-105 transition '
            onClick={() => signOut(auth)}>Logout
        </button>
      </div>
    </div>
    
  )
}

export default Navbar