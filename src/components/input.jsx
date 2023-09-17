import React from 'react'
import attach from '../img/attach.png'
import imgSource from '../img/img.png'
import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ChatContext } from '../context/ChatContext'
import { updateDoc, doc, arrayUnion, serverTimestamp } from 'firebase/firestore'
import { db } from '../firebase'
import { useState } from 'react'
import { v4 as uuid } from 'uuid'
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage'
import { storage } from '../firebase'
import { Timestamp } from 'firebase/firestore'



export const Input = () => {

  const [text, setText] = useState('');
  const [img, setImg] = useState(null);

  const {currentUser} = useContext(AuthContext);
  const {data} = useContext(ChatContext);

  const handleSend = async () => {

    if(img){
      const storageRef = ref(storage, uuid());
    
      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        (error) => {
          console.error("Upload error:", error);
        },
        () => {
          
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            await updateDoc(doc(db, "chats", data.chatId), {
              messages: arrayUnion({
                id: uuid(),
                text: text,
                senderId: currentUser.uid,
                date:Timestamp.now(),
                img:downloadURL,
            }),
          });
        });
      }
      );

      }else{
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text: text,
            senderId: currentUser.uid,
            date:Timestamp.now(),
          }),
      });

    };

    await updateDoc(doc(db, "userChats", currentUser.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });

    await updateDoc(doc(db, "userChats", data.user.uid), {
      [data.chatId+".lastMessage"]: {
        text,
      },
      [data.chatId+".date"]: serverTimestamp(),
    });



    setText('');
    setImg(null);
  }

  return (
    <div className='h-[4rem] bg-red-200 p-[0.625rem] flex flex-row items-center justify-between gap-3'>
        <input type="text" placeholder='Type a message...'onChange={e=>setText(e.target.value)} value={text} className='bg-gray-100 rounded-full px-[1.25rem] py-[0.625rem] w-[80%] outline-none'/>
        <div className='flex items-center gap-[0.625rem]'>
          <img src={attach} alt="" className='h-[2rem] cursor-pointer p-1 bg-red-300 rounded-lg '/>
          <input type="file"  id="file" className='hidden ' onChange={e=>setImg(e.target.files[0])}/>
          <label htmlFor="file" className='cursor-pointer'>
            <img src={imgSource} alt="" className='h-[2rem] w-[2rem] cursor-pointer  p-1 bg-red-300 rounded-lg'/>
          </label>
          <button  type='submit' onSubmit={handleSend} className='p-1 bg-green-400 rounded-lg text-white font-bold' >Send</button>
        </div>
    </div>
  )

}

export default Input