import React from 'react'


const Login = () => {
  return (
    <div className='bg-red-300 h-[100vh] flex items-center justify-center'>
        <div className='bg-red-100 border-4 border-white py-[15px] px-[60px] rounded-lg flex flex-col gap-[10px] items-center'>
            <span className='font-bold text-4xl text-white px-[20px] py-[5px] bg-red-300 rounded-lg'>Lard Chat</span>
            <span className='font-medium text-red-400 text-xl'>Login</span>
            <form className='flex flex-col gap-[15px] '>
                {/* <input type="text" placeholder='Display Name' className='border-red-400 border-b px-2 py-4 w-[100%] bg-red-100 text-red-400 placeholder-red-400'/> */}
                <input type="email" placeholder='Email' className='border-red-400 border-b px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400'/>
                <input type="password" placeholder='Password'className='border-red-400 border-b bg-none px-2 py-4 w-[100%]  bg-red-100 text-red-400 placeholder-red-400' />
                {/* <p className='items-left'>Upload a profile picture:</p> */}
                <button type="submit" className='m-auto py-0.5 w-[100%] rounded-sm bg-red-300 hover:bg-red-400 transition mt-[10px] text-white text-bold'>Log In</button>
                <p className='text-red-400'>Don't have an account? Register</p>
            </form>
        </div>
    </div>

  )
}

export default Login

