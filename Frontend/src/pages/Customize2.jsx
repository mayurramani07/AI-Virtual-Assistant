import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';

const Customize2 = () => {
  const { UserData } = useContext(UserDataContext);
  const [AssistantName, setAssistantName] = useState(UserData?.AssistantName || '');
  const navigate = useNavigate();

  const handleNext = () => {
    navigate('/customize2');
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-t from-black to-[#0a0236] flex flex-col items-center px-4 py-10">
      <h2 className="text-white text-2xl sm:text-4xl font-semibold text-center mt-40 mb-6">
        Enter Your Assistant Name
      </h2>

      <input
        type="text"
        placeholder="e.g. Shifra"
        value={AssistantName}
        onChange={(e) => setAssistantName(e.target.value)}
        className="w-full sm:max-w-sm p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
      />

      {AssistantName.trim() && (
        <button
          type="submit"
          className="w-full sm:max-w-sm bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all cursor-pointer mt-6"
          onClick={handleNext}
        >
          Create Your Assistant
        </button>
      )}
    </div>
  );
};

export default Customize2;
