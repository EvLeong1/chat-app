import React from 'react'
import Message from '../components/message'

function Messages() {
  return (
    <div className='bg-gray-100 p-[0.625rem] h-[calc(100%-7rem)]'>
        <Message/>
        <Message/>

        <Message/>
        <Message/>

    </div>
  )
}

export default Messages