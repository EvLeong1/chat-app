import React from 'react'
import Chat from '../components/chat'
import Sidebar from '../components/sidebar'

export const Home = () => {
  return (
    <div className='bg-green-100 h-[100vh] flex items-center justify-center'>
        <div className='border border-white rounded-lg shadow-lg w-[65%] h-[80%] flex overflow-hidden'>
            <Sidebar/>
            <Chat/>
            
        </div>
    </div>
  )
}

export default Home;
