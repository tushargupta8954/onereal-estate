import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';

const CreateListing = () => {
  const [files, setFiles] = useState([])
  const [formData, setFormData] = useState({
    imageUrls: [],
  });

  const [imageUploadError, setImageUploadError] = useState(false);

  const handleImageSubmit = (e) => {
    if (files.length > 0 && files.length + formData.imageUrls.length < 7) {
      setUploading(true);
      setImageUploadError(false);
      const promises = [];

      for (let i = 0; i < files.length; i++) {
        promises.push(storeImage(files[i]));
      }
      Promise.all(promises).then((urls) => {
        setFormData({
          ...formData, imageUrls: formData.imageUrls.concat(urls),
        });
        setImageUploadError(false);
        setUploading(false);
      }).catch((err) => {
        setImageUploadError("Images not uploaded. Please try again.");
        setUploading(false);
      });
    } else {
      setImageUploadError("Please select images to upload. Maximum 6 images allowed.");
      setUploading(false);
    }
  };

  const storeImage = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  const handleRemoveImage = (index) => {
    setFormData({
      ...formData, imageUrls: formData.ImageUrls.filter((_, i) => i !== index),
    });
  }
}

return (
  <main className='p-3 max-w-4xl mx-auto  bg-slate-300/70 backdrop-blur-lg border border-white/30 rounded-lg shadow-lg my-10 px-5'>
    <h1 className='text-3xl mask-r-from-neutral-200 font-semibold text-center my-10'>Create a Listing</h1>
    <form className='flex flex-col sm:flex-row gap-4' >
      <div className="flex flex-col gap-4 flex-1 text-gray-800 font-[sans-serif]">
        <input type="text" placeholder='Name' className='bg-gray-50 border   border-gray-400   outline-gray-800 p-3 rounded-lg' id='name' maxLength={62} minLength={10} required />
        <textarea type="text" placeholder='Description' className='bg-gray-50 border border-gray-400  outline-gray-900  p-3 rounded-lg' id='description' required />
        <input type="text" placeholder='Address' className='bg-gray-50 border  border-gray-400  outline-gray-800  p-3 rounded-lg' id='address' required />

        <div className='flex flex-wrap gap-6 '>
          <div className='flex gap-2'>
            <input type="checkbox" id='sale' className='w-5' />
            <span >For Sale</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='rent' className='w-5' />
            <span >For Rent</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='parking' className='w-5' />
            <span >Parking spot</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='furnished' className='w-5' />
            <span >Furnished</span>
          </div>
          <div className='flex gap-2'>
            <input type="checkbox" id='offer' className='w-5' />
            <span >Offer</span>
          </div>
        </div>
        <div className='flex flex-wrap gap-6'>
          <div className='flex items-center gap-2'>
            <input type="number" id='bedrooms' min={1} max={10} required className='bg-gray-50 border border-gray-300  outline-gray-800 rounded-lg p-2' />
            <p>Beds</p>
          </div>
          <div className='flex items-center gap-2'>
            <input type="number" id='bathrooms' min={1} max={10} required className='bg-gray-50 border border-gray-300  outline-gray-800 rounded-lg p-2' />
            <p>Bathrooms</p>
          </div>
          <div className='flex items-center gap-2'>
            <input type="number" id='regularPrice' min={1} max={10} required className='bg-gray-50 border border-gray-300  outline-gray-800 rounded-lg p-2' />
            <div className='flex items-center flex-col'>
              <p>Regular price</p>
              <span className='text-xs'>(₹ / Month)</span>
            </div>

          </div>
          <div className='flex items-center gap-2'>
            <input type="number" id='discountPrice' min={1} max={10} required className='bg-gray-50 border border-gray-300  outline-gray-800 rounded-lg p-2' />
            <div className='flex items-center flex-col'>
              <p>Discounted price</p>
              <span className='text-xs'>(₹ / Month)</span>
            </div>
          </div>
        </div>
      </div>
      <div className='flex flex-col flex-1 gap-4'>
        <p className='font-semibold '>Images: <span className='font-normal text-gray-600 ml-2'>The first image will be the cover (max 6)</span></p>
        <div className='flex  gap-4'>
          <input onChange={(e) => setFiles(e.target.files)} type="file" name="" id="images" accept='image/*' multiple className='p-3 border border-gray-400 bg-gray-50 rounded w-full cursor-pointer hover:text-gray-700 hover:shadow-lg' />
          <button type='button' onClick={handleImageSubmit} disabled={uploading} className='p-3 text-green-700 border border-green-700 rounded hover:shadow-lg disabled:opacity-80 hover:text-black cursor-pointer'>{uploading ? 'Uploading...' : 'Upload'}</button>
        </div>
        <p className='text-red-500 text-sm'>{imageUploadError && imageUploadError}</p>
        {
          formData.imageUrls.length > 0 && formData.imageUrls.map((url, index) => (
            <div key={url} className='flex justify-between p-3 border items-center'>
              <img src={url} alt='Listing image' className='w-20 h-20 object-contain rounded-lg' />
              <button onClick={() => handleRemoveImage(index)} className='p-3 text-red-500 rounded-lg hover:opacity-75 cursor-pointer'>
                Delete
              </button>
            </div>
          ))

        }
        <button className='p-2 bg-gray-700 text-white rounded-lg hover:opacity-95 disabled:opacity-80 cursor-pointer'>Create Listing</button>
      </div>
    </form>
  </main>
)
}

export default CreateListing
