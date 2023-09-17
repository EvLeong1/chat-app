import React from 'react'
import Message from '../components/message'
import { useContext } from 'react'
import { ChatContext } from '../context/ChatContext'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase'
import { useEffect } from 'react'
import { useState } from 'react'


function Messages() {
  const [messages, setMessages] = useState([]); 
  const {data} = useContext(ChatContext);


  useEffect(() => {
    const unsub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    })

    return () => {
      unsub();
    }

  }, [data.chatId])
  return (
    <div className='bg-red-100 p-[0.625rem] h-[calc(100%-7rem)] overflow-scroll overflow-x-hidden'>
        {messages.map(m=>(
          <Message message={m} key={m.id}/>
        ))}

    </div>
  )
}

export default Messages