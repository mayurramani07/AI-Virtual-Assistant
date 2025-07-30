import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/userContext';

const Home = () => {
  const { UserData, serverUrl, setUserData } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get(`${serverUrl}/api/auth/logout`, { withCredentials: true });
      setUserData(null);
      navigate('/signin');
    } catch (error) {
      console.error('Logout error:', error);
      setUserData(null); 
      navigate('/signin');
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#0a0236] px-4 py-8 flex flex-col items-center">
    
      <div className="w-full flex justify-end items-center gap-3 sm:gap-4">
        <button
          onClick={handleLogout}
          className="bg-white text-black font-medium py-1.5 px-3 sm:py-2 sm:px-3 rounded-md hover:bg-gray-200 transition-all text-xs sm:text-sm"
        >
          Logout
        </button>

        <button
          onClick={() => navigate('/customize')}
          className="bg-white text-black font-medium py-1.5 px-3 sm:py-2 sm:px-3 rounded-md hover:bg-gray-200 transition-all text-xs sm:text-sm"
        >
          Customize Your Assistant
        </button>
      </div>

      <div className="mt-20 sm:mt-12" />

      <div className="w-60 h-60 sm:w-72 sm:h-72 flex justify-center items-center overflow-hidden rounded-2xl border border-white shadow-lg">
        {UserData?.assistantImage ? (
          <img
            src={UserData.assistantImage}
            alt="Assistant"
            className="w-full h-full object-cover"
          />
        ) : (
          <p className="text-white text-center">No image available</p>
        )}
      </div>

      <h1 className="text-white text-lg sm:text-xl font-semibold text-center mt-6">
        Hello, I am {UserData?.assistantName || 'your assistant'}
      </h1>
    </div>
  );
};

export default Home;
