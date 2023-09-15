import React from 'react'
import Message from '../components/message'

function Messages() {
  return (
    <div className='bg-red-100 p-[0.625rem] h-[calc(100%-7rem)] overflow-scroll overflow-x-hidden'>
        <Message/>
        <Message/>

        <Message/>
        <Message/>

    </div>
  )
}

export default Messages