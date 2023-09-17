import React from 'react'
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../firebase';


const Login = () => {

  const [err,setErr] = useState(false)
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log(e.target[0].value)
        const email = e.target[0].value;
        const password = e.target[1].value;
        try{
            await signInWithEmailAndPassword(auth, email, password);
            navigate('/');
            
        } catch(err){
            setErr(true)
        }
        
    };

  return (
    <div className='bg-green-100 h-[100vh] flex items-center justify-center'>
        <div className='bg-red-100 border-4 border-white py-[15px] px-[60px] rounded-lg flex flex-col gap-[10px] items-center shadow-md'>
            <span className='font-bold text-4xl text-white px-[20px] py-[5px] bg-green-300 rounded-lg'>Lard Chat</span>
            <span className='font-medium text-red-400 text-xl'>Login</span>
            <form className='flex flex-col gap-[15px] ' onSubmit={handleSubmit}>
                {/* <input type="text" placeholder='Display Name' className='border-red-400 border-b px-2 py-4 w-[100%] bg-red-100 text-red-400 placeholder-red-400'/> */}
                <input type="email" placeholder='Email' className='border-red-400 border-b px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400 outline-none'/>
                <input type="password" placeholder='Password'className='border-red-400 border-b bg-none px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400 outline-none' />
                {/* <p className='items-left'>Upload a profile picture:</p> */}
                <button type="submit" className='m-auto py-0.5 w-[100%] rounded-sm bg-red-300 hover:bg-red-400 transition mt-[10px] text-white text-bold'>Log In</button>
                {err && <p className='text-red-400 items-center'>Something went wrong!</p>}

                <p className='text-red-400'>Don't have an account? <Link to="/register" className='underline'>Register</Link></p>
                
            </form>
        </div>
    </div>

  )
}

export default Login

