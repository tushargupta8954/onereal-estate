import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux';

const DEFAULT_AVATAR =
  'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

const Header = () => {
  const { currentUser } = useSelector(state => state.user);
  const avatarSrc = currentUser?.avatar || currentUser?.photo || DEFAULT_AVATAR;

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
          <Link to='/profile'>
            {currentUser ? (
              <img
                src={avatarSrc}
                alt="profile"
                className='w-8 h-8 rounded-full object-cover'
                onError={(e) => {
                  e.currentTarget.src = DEFAULT_AVATAR;
                }}
              />
            ) : (<li className=' text-slate-600 hover:underline cursor-pointer'>Sign in</li>

            )}
          </Link>

        </ul>
      </div>
    </header>
  )
}

export default Header