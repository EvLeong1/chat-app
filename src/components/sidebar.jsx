import React from 'react'
import Navbar from './navbar'
import Search from './search'
import Chats from './chats'

const Sidebar = () => {
  return (
    <div className='w-[34%] bg-red-400'>
      <Navbar/>
      <Search/>
      <Chats/>
    </div>
  )
}

export default Sidebar