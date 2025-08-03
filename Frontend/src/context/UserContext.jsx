import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';
export const UserDataContext = createContext();

function UserContext({ children }) {
  const serverUrl = "https://ai-virtual-assistant-backend-jela.onrender.com";
  const [UserData, setUserData] = useState(null);
  const [frontendImage, setFrontendImage] = useState(null);
  const [backendImage, setBackendImage] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleCurrentUser = async () => {
    try {
      const result = await axios.get(`${serverUrl}/api/user/current`, {
        withCredentials: true,
      });
      setUserData(result.data);
      console.log(result.data);
    } catch (error) {
      console.error("Error fetching user:", error.message);
    }
  };

  const getGeminiResponse = async (command) => {
    try {
      const result = await axios.post(`${serverUrl}/api/user/asktoassistant`,{ command },{ withCredentials: true });
      return result.data;
    } catch (error) {
      console.error("Error getting Gemini response:", error.message);
      return null;
    }
  };

  useEffect(() => {
    handleCurrentUser();
  }, []);

  const value = {
    serverUrl,
    UserData,
    setUserData,
    handleCurrentUser,
    frontendImage,
    setFrontendImage,
    backendImage,
    setBackendImage,
    selectedImage,
    setSelectedImage,
    getGeminiResponse,
  };

  return (
    <UserDataContext.Provider value={value}>
      {children}
    </UserDataContext.Provider>
  );
}

export default UserContext;
