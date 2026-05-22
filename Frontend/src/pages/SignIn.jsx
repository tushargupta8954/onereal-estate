import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom'
import { signInStart, signInSuccess, signInFailure } from '../redux/user/userSlice';
import OAuth from '../components/OAuth';

const SignIn = () => {
  const [formData, setFormData] = useState({});
  const {loading, error} = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData, 
      [e.target.id]: e.target.value
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
       dispatch(signInStart());
    const res = await fetch('/api/auth/signin', 
    { 
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
      
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(signInFailure(data.message));
      return;
    }
    dispatch(signInSuccess(data));
    navigate('/');
    console.log(data);
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
   
    

  };
  console.log(formData);
  return (
    <div className='p-3 max-w-lg mx-auto bg-slate-200 backdrop-blur-md rounded-lg shadow-md mt-10 '>
      <h1 className='text-3xl text-center font-semibold my-7 text-gray-700'>
        Sign in
      </h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4 mx-4 '>
        
        <input onChange={handleChange} type="email" placeholder='email' className='border
         border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='email' />

        <input onChange={handleChange} type="password" placeholder='password' className='border
         border-gray-400 p-3 rounded-lg bg-gray-100 outline-none' id='password' />

        <button disabled={loading} className='bg-slate-800 text-gray-100 p-2 rounded-lg mt-5 hover:opacity-95 
        disabled:opacity-80 cursor-pointer'>{loading ? 'Loading...' : 'Sign In'}</button>
        <OAuth/>

      </form >
      <div className='flex items-center justify-center gap-2 mt-5 mb-5'>
        <p className='text-gray-700'>Do not have an account?</p>
        <Link to={"/sign-up"}>
          <span className='text-blue-700 '>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500 text-center'>{error}</p>}
    </div>
  )
}

export default SignIn
