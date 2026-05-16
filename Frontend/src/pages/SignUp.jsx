import React from 'react'
import { Link } from 'react-router-dom'

const SignUp = () => {
  return (
    <div className='p-3 max-w-lg mx-auto bg-slate-200 backdrop-blur-md rounded-lg shadow-md mt-10 '>
      <h1 className='text-3xl text-center font-semibold my-7 text-gray-700'>
        Sign up 
      </h1>
      <form action="" className='flex flex-col gap-4 mx-4 '>
        <input type="text" placeholder='username' className='border border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='username'/>
        
        <input type="email" placeholder='email' className='border border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='email'/>
        
        <input type="password" placeholder='password' className='border border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='password'/>        
        <button className='bg-slate-800 text-gray-100 p-2 rounded-lg mt-5 hover:opacity-95 disabled:opacity-80 cursor-pointer'>Sign Up</button>

      </form>
      <div className='flex items-center justify-center gap-2 mt-5 mb-5'>
        <p className='text-gray-700'>Already have an account?</p>
        <Link to={"/sign-in"}>
        <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
    </div>
  )
}

export default SignUp
