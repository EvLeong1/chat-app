import React from 'react'

const Register = () => {
  return (
    <div className='bg-blue-300 h-[100vh] flex items-center justify-center'>
        <div>
            <span >Lard Chat</span>
            <span>Register</span>
            <form>
                <input type="text" placeholder='Display Name'/>
                <input type="email" placeholder='Email'/>
                <input type="password"placeholder='Password' />
                <input type="file" />
                <button type="submit">Sign Up</button>
                <p>Already have an account? Login</p>
            </form>
        </div>
    </div>

  )
}

export default Register
