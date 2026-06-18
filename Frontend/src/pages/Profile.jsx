import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getStorage, ref, uploadBytesResumable, getDownloadURL, } from "firebase/storage";
import { app } from "../firebase";

const DEFAULT_AVATAR =
  "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  const fileRef = useRef(null);
  const [file, setFile] = useState(undefined);
  const [filePerc, setFilePerc] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [formData, setFormData] = useState({});

  console.log(formData);
  console.log(filePerc);
  console.log(fileUploadError);

  // firebase storage logic for uploading the profile picture can be added here
  // allow read;
  // allow write: if 
  // request.resource.size < 2 * 1024 * 1024 &&
  // request.resource.contentType.matches('image/.*')

  useEffect(() => {
    if (file) {
      // logic to upload the file to firebase storage and update the user's profile picture
      handleFileUpload(file);
    }
  }, [file]);

  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;

        setFilePerc(Math.round(progress));
      },
      (error) => {
        setFileUploadError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setFormData((prev) => ({ ...prev, avatar: downloadURL }));
        });
      }
    );
  };

  const avatarSrc = formData.avatar || currentUser?.avatar || currentUser?.photo || DEFAULT_AVATAR;

  return (
    <div className="p-3 max-w-lg mx-auto  bg-slate-200/50 backdrop-blur-lg border border-white/30 rounded-2xl shadow-lg mt-10 ">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4">
        <input onChange={(e) => setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept="image/*" />
        <img
          onClick={() => fileRef.current.click()}
          src={avatarSrc}
          alt="profile"
          className="rounded-full self-center mt-2 h-25 w-25 object-cover cursor-pointer"
          onError={(e) => {
            e.currentTarget.src = DEFAULT_AVATAR;
          }}
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input type="text" placeholder="Username" id="username" className="bg-white border  border-gray-400 outline-none p-3 rounded-lg" />
        <input type="email" placeholder="E-mail" id="email" className="bg-white border border-gray-400 outline-none p-3  rounded-lg" />
        <input type="password" placeholder="Password" id="password" className="bg-white border border-gray-400 outline-none p-3  rounded-lg" />
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
