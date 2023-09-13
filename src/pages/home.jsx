import React from 'react'
import Chat from '../components/chat'
import Sidebar from '../components/sidebar'

export const Home = () => {
  return (
    <div className='bg-red-300 h-[100vh] flex items-center justify-center'>
        <div className='border border-white rounded-lg w-[65%] h-[80%] flex overflow-hidden'>
            <Sidebar/>
            <Chat/>
        </div>
    </div>
  )
}

export default Home;
