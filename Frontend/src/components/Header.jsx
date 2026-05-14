import React from 'react'
import { FaSearch } from 'react-icons/fa'
import {Link, Links} from 'react-router-dom'

const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md'>
      <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
        <Link to='/'>
        <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
          <span className='text-slate-500'>1Real</span>
          <span className='text-slate-700'>Estate</span>
        </h1>
        </Link>

        <form className='flex items-center gap-2'>
          <input
            type="text"
            placeholder='Search...'
            className='bg-gray-50 focus:outline-none pl-2 p-1 w-24  sm:w-64 text-gray-700 rounded-lg'
          />
          <div className='bg-gray-300 size-7 rounded-full sm:size-10 pl-2 pr-2 hover:bg-blue-200 cursor-pointer -my-2 flex justify-center items-center'>
          <FaSearch className="text-slate-700  size-4.5  " />
          </div>
        </form>
        <ul className='flex gap-4'>
          <Link to='/'>
          <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer '>Home</li>
          </Link>

          <Link to='/about'>
          <li className='hidden sm:inline text-slate-600 hover:underline cursor-pointer'>About</li>
          </Link>

          <Link to='/sign-in'>
          <li className=' text-slate-600 hover:underline cursor-pointer'>Sign in</li>
          </Link>
        </ul>
      </div>
    </header>
  )
}

export default Header