import React from 'react'
import { IconContext } from 'react-icons'
import { RiImageAddFill } from 'react-icons/ri'
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth,storage,db } from '../firebase';
import { useState } from 'react';
import { doc, setDoc } from "firebase/firestore"; 
import {ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate, Link } from 'react-router-dom';

const Register = () => {

    const handleFileInputChange = (e) => {
        const fileInput = e.target;
        const fileLabel = document.getElementById('file-label');
    
        if (fileInput.files.length > 0) {
          fileLabel.innerText = fileInput.files[0].name;
        } else {
          fileLabel.innerText = 'Pfp Uploaded';
        }
      };

      const [err, setErr] = useState(false);
      const [loading, setLoading] = useState(false);
      const navigate = useNavigate();
    
      const handleSubmit = async (e) => {
        setLoading(true);
        e.preventDefault();
        const displayName = e.target[0].value;
        const email = e.target[1].value;
        const password = e.target[2].value;
        const file = e.target[3].files[0];
      
        try {
          // Create the user account
          const res = await createUserWithEmailAndPassword(auth, email, password);
          const storageRef = ref(storage, displayName);
      
          // Upload the file
          const uploadTask = uploadBytesResumable(storageRef, file);
      
          uploadTask.on(
            "state_changed",
            null,
            (uploadError) => {
              console.error("Upload error:", uploadError);
              setErr(true);
            },
            async () => {
              try {
                const downloadURL = await getDownloadURL(storageRef);
      
                // Update user profile and set user data
                await updateProfile(res.user, {
                  displayName,
                  photoURL: downloadURL,
                });
                await setDoc(doc(db, "users", res.user.uid), {
                  uid: res.user.uid,
                  displayName,
                  email,
                  photoURL: downloadURL,
                });
      
                // Create empty user chats on Firestore
                await setDoc(doc(db, "userChats", res.user.uid), {});
      
                // Navigation should only happen after all operations are complete
                navigate("/");
              } catch (firestoreError) {
                console.error("Firestore error:", firestoreError);
                setErr(true);
                setLoading(false);
              }
            }
          );
        } catch (authError) {
          console.error("Authentication error:", authError);
          setErr(true);
          setLoading(false);
        }
      };

  return (
    <div className='bg-green-100 h-[100vh] flex items-center justify-center'>
        <div className='bg-red-100 border-4 border-white py-[15px] px-[60px] rounded-lg flex flex-col gap-[10px] items-center shadow-md'>
            <span className='font-bold text-4xl text-white px-[20px] py-[5px] bg-green-300 rounded-lg'>Lard Chat</span>
            <span className='font-medium text-red-400 text-xl'>Register</span>
            <form className='flex flex-col gap-[15px] ' onSubmit={handleSubmit}>
                <input type="text" placeholder='Display Name' className='border-red-400 border-b px-2 py-4 w-[100%] bg-red-100 text-red-400 placeholder-red-400 outline-none'/>
                <input type="email" placeholder='Email' className='border-red-400 border-b px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400 outline-none'/>
                <input type="password" placeholder='Password'className='border-red-400 border-b bg-none px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400 outline-none' />
                {/* <p className='items-left'>Upload a profile picture:</p> */}
                <input type="file" id="file" className='hidden text-red-400 file:bg-red-300 file:rounded-md file:text-white file:border-red-400 file:cursor-pointer' onChange={handleFileInputChange} />
                <label htmlFor='file' className='cursor-pointer flex items-center w-[60%] gap-[10px] text-red-400 text-sm hover:scale-110 transition'><IconContext.Provider value={{color: 'rgb(248 113 113)', size: '3.5rem'}}><RiImageAddFill/></IconContext.Provider><span id='file-label'>Add a Pfp</span></label>
                <button disabled={loading} type="submit" className='m-auto py-0.5 w-[100%] rounded-sm bg-red-300 hover:bg-red-400 transition mt-[10px] text-white text-bold'>Sign Up</button>
                {loading && "Uploading image, please wait..."}
                {err && <p className='text-red-400 items-center'>Something went wrong! Password should be more than 6 characters!</p>}
                <p className='text-red-400'>Already have an account? <Link to="/login" className='underline'>Login</Link></p>
            </form>
        </div>
    </div>

  )
}

export default Register

