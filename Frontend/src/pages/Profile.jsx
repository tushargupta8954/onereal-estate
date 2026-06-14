import { useSelector } from "react-redux";


const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="p-3 max-w-lg mx-auto  bg-slate-200/50 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg mt-10 ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full self-center mt-2 h-25 w-25 object-cover cursor-pointer" />
        <input type="text" placeholder="Username" id="username" className="bg-white border border border-gray-400 outline-none p-3 rounded-lg" />
        <input type="email" placeholder="E-mail" id="email" className="bg-white border border-gray-400 outline-none p-3  rounded-lg" />
        <input type="password" placeholder="Password" id="password" className="bg-white border border border-gray-400 outline-none p-3  rounded-lg" />
        <button className="bg-slate-800 text-gray-100 p-2 rounded-lg mt-5 hover:opacity-95 cursor-pointer disabled:opacity-80">Update</button>
      </form>
      <div className="flex justify-center gap-4 mt-5">
        <span className="text-red-500  p-2 hover:underline cursor-pointer">Delete account</span>
        <span className="text-red-500  p-2 hover:underline cursor-pointer">Sign Out</span>
      </div>

    </div>
  )
}

export default Profile
