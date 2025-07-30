import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/userContext';
import axios from 'axios';

const Customize2 = () => {
  const {
    UserData,
    setUserData,
    backendImage,
    selectedImage,
    serverUrl,
  } = useContext(UserDataContext);

  const [AssistantName, setAssistantName] = useState(UserData?.assistantName || '');
  const navigate = useNavigate();

  const handleUpdateAssistant = async () => {
    try {
      const formData = new FormData();
      formData.append("assistantName", AssistantName); 

      if (backendImage instanceof File) {
        formData.append("assistantImage", backendImage); 
      } else if (selectedImage && !backendImage) {
        formData.append("imageURL", selectedImage);
      }

      const result = await axios.post(`${serverUrl}/api/user/update`, formData, {
        withCredentials: true,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("Update successful:", result.data);
      setUserData(result.data);
      navigate("/");
    } catch (error) {
      console.error("Failed to update assistant:", error.message);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#0a0236] flex flex-col items-center px-4 py-10 relative">
      <button
        className="absolute top-6 left-4 text-white text-2xl hover:text-gray-300 transition cursor-pointer"
        onClick={() => navigate('/customize')}
      >
      ←
      </button>

      <h2 className="text-white text-2xl sm:text-4xl font-semibold text-center mt-20 mb-6">
        Enter Your Assistant Name
      </h2>

      <input
        type="text"
        placeholder="e.g. Shifra"
        value={AssistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        className="w-full sm:max-w-sm p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
      />

      {(backendImage || selectedImage) && (
        <div className="mt-6 w-32 h-32 rounded-full overflow-hidden border-2 border-white">
          <img
            src={
              backendImage instanceof File
                ? URL.createObjectURL(backendImage)
                : selectedImage
            }
            alt="Assistant"
            className="w-full h-full object-cover"
          />
        </div>
      )}

      {AssistantName.trim() && (
        <p className="text-white text-xl mt-4">
          Assistant Name: <span className="font-bold">{AssistantName}</span>
        </p>
      )}

      {AssistantName.trim() && (
        <button
          type="submit"
          className="w-full sm:max-w-sm bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all cursor-pointer mt-6"
          onClick={handleUpdateAssistant}
        >
          Create Your Assistant
        </button>
      )}
    </div>
  );
};

export default Customize2;
