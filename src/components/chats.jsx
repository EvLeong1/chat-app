import { doc, onSnapshot } from 'firebase/firestore'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { db } from '../firebase'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'

export const Chats = () => {

  const [chats, setChats] = useState([])

  const {currentUser} = useContext(AuthContext);
  const {dispatch} = useContext(ChatContext);

  useEffect(() => {
    const getChats = () => {
      // console.log("current user "+currentUser.uid);
      const unsub = onSnapshot(doc(db, "userChats", currentUser.uid), (doc) => {
        // console.log("doc data "+doc.data());

        setChats(doc.data());
        // console.log("chats 1 "+chats);
      });

      return () => {
        unsub();
      };
  };
  currentUser.uid && getChats();
  }, [currentUser.uid])

  const handleSelect = (u) => {
    // console.log("info "+u);
    // console.log("chats"+chats[0])

    dispatch({type:"CHANGE_USER", payload:u});

  }

  return (
    <div>
      {Object.entries(chats)?.sort((a,b)=>b[1].date -a[1].date).map((chat) => (
        <div key={chat[0]} onClick={()=>handleSelect(chat[1].userInfo)} className='p-[0.625rem] flex items-center gap-[0.625rem] text-white cursor-pointer hover:bg-[#ca5c5c] transition'>
          <img src={chat[1].userInfo.photoURL} alt="" className='w-[3.125rem] h-[3.125rem] rounded-full object-cover'/>
          <div className='flex flex-col items-center'>
            <span className='font-medium text-lg'>{chat[1].userInfo.displayName}</span>
            <p className='font-gray-300 font-light text-xs'>{chat[1].lastMessage?.text}</p>
          </div>
        </div>
      ))}
      
    </div>
  );
};
export default Chats