import { collection, serverTimestamp, setDoc } from 'firebase/firestore';
import React from 'react'
import { useState } from 'react';
import {db} from '../firebase';
import { query, where, getDocs, getDoc, doc} from "firebase/firestore";
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { updateDoc } from 'firebase/firestore';


export const Search = () => {

  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);

  const {currentUser} = useContext(AuthContext);

  const searchUser = async () => {
    const users = collection(db, 'users');
    const q = query(users, where("displayName", "==", username));

    try{
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setUser(doc.data());
      });
    }
    catch(err){
      setErr(true);
    }
  }

  const handleKey = (e) => {
    e.code === "Enter" && searchUser();
  };

  const handleSelect = async () => {
    //check whether the users already have a chat 
    //if not, create a new chat
    if (currentUser.uid === user.uid) return;
    const combId = currentUser.uid > user.uid ? currentUser.uid + user.uid : user.uid + currentUser.uid;
    try{
      const res = await getDoc(doc(db, "chats", combId));

      if(!res.exists()){
        //create a new chat
        await setDoc(doc(db, "chats", combId), {messages:[]});

        //create the chat for the current user
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combId+".userInfo"]: {
            uid:user.uid,
            displayName:user.displayName,
            photoURL:user.photoURL,
          },
          [combId+".date"]: serverTimestamp(),
        });

        //create the chat for the other user
        await updateDoc(doc(db, "userChats", user.uid), {
          [combId+".userInfo"]: {
            uid:currentUser.uid,
            displayName:currentUser.displayName,
            photoURL:currentUser.photoURL,
          },
          [combId+".date"]: serverTimestamp(),
        });


      }
    } catch(err){}

    setUser(null);
    setUsername('');

  };

  return (
    <div className='border-b border-white'>
      <div className='p-[0.625rem]'>
        <input type='text' placeholder='🔍︎ Find a user' onKeyDown={handleKey} onChange={e=>setUsername(e.target.value)} value={username} className='border border-white rounded-full placeholder:text-white placeholder:text-opacity-70 text-white p-3 bg-transparent w-[100%] h-[30px] outline-none'></input>
      </div>
      {err && <span className='text-red-400 items-center'>User not found!</span>}
      {user && (<div className='p-[0.625rem] flex items-center gap-[0.625rem] text-white cursor-pointer hover:bg-[#ca5c5c] transition'
        onClick={handleSelect}>
        <img src={user.photoURL} alt="" className='w-[3.125rem] h-[3.125rem] rounded-full object-cover'/>
        <div>
          <span className='font-medium text-lg'>{user.displayName}</span>
        </div>
      </div>
      )}
    </div>
  )
}

export default Search