import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const SignUp = () => {
  const [formData, setFormData] = useState({});
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       setLoading(true);
    const res = await fetch('/api/auth/signup', 
    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    });
    const data = await res.json();
    if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
    }
    setLoading(false);
    setError(null);
    navigate('/sign-in');
    console.log(data);
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
   
    

  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto bg-slate-200 backdrop-blur-md rounded-lg shadow-md mt-10 '>
      <h1 className='text-3xl text-center font-semibold my-7 text-gray-700'>
        Sign up
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-4 '>
        <input onChange={handleChange} type="text" placeholder='username' className='border
         border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='username' />

        <input onChange={handleChange} type="email" placeholder='email' className='border
         border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='email' />

        <input onChange={handleChange} type="password" placeholder='password' className='border
         border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='password' />

        <button disabled={loading} className='bg-slate-800 text-gray-100 p-2 rounded-lg mt-5 hover:opacity-95 
        disabled:opacity-80 cursor-pointer'>{loading ? 'Loading...' : 'Sign Up'}</button>

      </form >
      <div className='flex items-center justify-center gap-2 mt-5 mb-5'>
        <p className='text-gray-700'>Already have an account?</p>
        <Link to={"/sign-in"}>
          <span className='text-blue-700 '>Sign in</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}

export default SignUp
