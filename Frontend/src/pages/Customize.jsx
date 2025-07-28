import React, { useContext, useRef } from 'react';
import Card from "../components/Card";
import { FaUpload } from "react-icons/fa";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.jpg";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.jpeg";
import image7 from "../assets/image7.jpeg";
import { UserDataContext } from '../context/UserContext';
import { useNavigate } from 'react-router-dom';

const Customize = () => {
  const {
    frontendImage,
    setFrontendImage,
    selectedImage,
    setSelectedImage
  } = useContext(UserDataContext);

  const navigate = useNavigate()
  const inputImage = useRef();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      const newImageURL = URL.createObjectURL(file);
      setFrontendImage(newImageURL);
      setSelectedImage(newImageURL);
    }
  };

  const handleUploadBoxClick = () => {
    if (selectedImage === frontendImage) {
      setSelectedImage(null);
    } else if (frontendImage) {
      setSelectedImage(frontendImage);
    }
  };

  return (
    <div className='w-full min-h-screen bg-gradient-to-t from-black to-[#0a0236] flex flex-col items-center px-4 py-10'>

      <h2 className='text-white text-2xl sm:text-4xl font-semibold text-center mt-20 mb-6'>
        Choose Your Assistant Avatar
      </h2>

      <div className='w-full flex justify-center'>
        <div className='max-w-7xl w-full flex flex-wrap justify-center gap-4 sm:gap-6 mt-8'>
          <Card image={image1} />
          <Card image={image2} />
          <Card image={image4} />
          <Card image={image5} />
          <Card image={image6} />
          <Card image={image7} />

          <div
            className={`relative w-[80px] sm:w-[100px] aspect-square rounded-xl border transition-all duration-200 
            ${selectedImage === frontendImage ? 'border-blue-500 border-4' : 'border-white/20 hover:border-white'} 
            bg-white/10 flex items-center justify-center cursor-pointer group overflow-hidden`}
            onClick={handleUploadBoxClick}
          >
            <label htmlFor="image-upload" className='w-full h-full flex flex-col items-center justify-center text-white z-10 cursor-pointer'>
              <FaUpload className='text-xl sm:text-2xl group-hover:scale-110 transition-transform duration-200' />
              <span className='text-[10px] sm:text-xs mt-1'>Upload</span>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                className='hidden'
                ref={inputImage}
                onChange={handleImage}
              />
            </label>

            {frontendImage && (
              <img
                src={frontendImage}
                alt="Uploaded"
                className="absolute top-0 left-0 w-full h-full object-cover z-0 rounded-xl"
              />
            )}
          </div>

        </div>
      </div>
      {selectedImage && (
        <div className="mt-12 w-full flex justify-center">
          <button
            type="submit"
            className="w-full max-w-sm bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all cursor-pointer"
            onClick={() => navigate("/customize2")}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Customize;
