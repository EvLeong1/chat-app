import React from 'react'
import { IconContext } from 'react-icons'
import { RiImageAddFill } from 'react-icons/ri'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage } from '../firebase';
import { useState } from 'react';

import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Register = () => {

    const [err,setErr] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target[0].value)
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
        try{
            const res = await createUserWithEmailAndPassword(auth, email, password)

            const storageRef = ref(storage, displayName);

            const uploadTask = uploadBytesResumable(storageRef, file);

            uploadTask.on(
            (error) => {
                setErr(true)
            }, 
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                    await updateProfile(res.user, {
                        displayName: displayName,
                        photoURL: downloadURL
                    })
                });
            }
            );
            
        } catch(err){
            setErr(true)
        }
        
    }


  return (
    <div className='bg-green-100 h-[100vh] flex items-center justify-center'>
        <div className='bg-red-100 border-4 border-white py-[15px] px-[60px] rounded-lg flex flex-col gap-[10px] items-center'>
            <span className='font-bold text-4xl text-white px-[20px] py-[5px] bg-red-300 rounded-lg'>Lard Chat</span>
            <span className='font-medium text-red-400 text-xl'>Register</span>
            <form className='flex flex-col gap-[15px] ' onSubmit={handleSubmit}>
                <input type="text" placeholder='Display Name' className='border-red-400 border-b px-2 py-4 w-[100%] bg-red-100 text-red-400 placeholder-red-400 outline-none'/>
                <input type="email" placeholder='Email' className='border-red-400 border-b px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400 outline-none'/>
                <input type="password" placeholder='Password'className='border-red-400 border-b bg-none px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400 outline-none' />
                {/* <p className='items-left'>Upload a profile picture:</p> */}
                <input type="file" id="file" className='hidden file:bg-red-300 file:rounded-md file:text-white file:border-red-400 file:cursor-pointer' />
                <label htmlFor='file' className='cursor-pointer flex items-center w-[60%] gap-[10px] text-red-400 text-sm hover:scale-110 transition'><IconContext.Provider value={{color: 'rgb(248 113 113)', size: '3.5rem'}}><RiImageAddFill/></IconContext.Provider><span>Add a Pfp</span></label>
                <button type="submit" className='m-auto py-0.5 w-[100%] rounded-sm bg-red-300 hover:bg-red-400 transition mt-[10px] text-white text-bold'>Sign Up</button>
                {err && <p className='text-red-400 items-center'>Something went wrong!</p>}
                <p className='text-red-400'>Already have an account? Login</p>
            </form>
        </div>
    </div>

  )
}

export default Register

