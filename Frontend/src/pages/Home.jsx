import React, { useContext, useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { UserDataContext } from '../context/UserContext';

const Home = () => {
  const { UserData, serverUrl, setUserData, getGeminiResponse } = useContext(UserDataContext);
  const navigate = useNavigate();
  const [listening, setListening] = useState(false);
  const isSpeakingRef = useRef(false);
  const isRecognizingRef = useRef(false); 
  const recognitionRef = useRef(null);
  const synth = window.speechSynthesis;

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

  const speak = (text) => {
    const utterance = new SpeechSynthesisUtterance(text);
    isSpeakingRef.current = true;
    utterance.onend = () => {
      isSpeakingRef.current = false;
    };
    synth.speak(utterance);
  };

  const handleCommand = (data) => {
    const { type, userInput, response } = data;
    speak(response);

    if (type === 'google-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }

    if (type === 'youtube-search') {
      const query = encodeURIComponent(userInput);
      window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
    }

    if (type === 'instagram-open') {
      window.open('https://www.instagram.com', '_blank');
    }

    if (type === 'facebook-open') {
      window.open('https://www.facebook.com', '_blank');
    }

    if (type === 'calculator-open') {
      window.open('https://www.google.com/search?q=calculator', '_blank');
    }

    if (type === 'weather-show') {
      const query = encodeURIComponent(userInput || 'weather');
      window.open(`https://www.google.com/search?q=${query}`, '_blank');
    }
  };

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.lang = 'en-US';

    recognitionRef.current = recognition;

    const safeRecognition = () => {
      if (!isSpeakingRef.current && !isRecognizingRef.current) {
        try {
          recognition.start();
          console.log("Recognition requested to start");
        } catch (err) {
          if (err.name !== 'InvalidStateError') {
            console.error('Start error:', err);
          }
        }
      }
    };

    recognition.onstart = () => {
      console.log('Recognition started');
      isRecognizingRef.current = true;
      setListening(true);
    };

    recognition.onend = () => {
      console.log('Recognition ended');
      isRecognizingRef.current = false;
      setListening(false);
      if (!isSpeakingRef.current) {
        setTimeout(() => safeRecognition(), 1000);
      }
    };

    recognition.onerror = (event) => {
      console.warn('Recognition error:', event.error);
      isRecognizingRef.current = false;
      setListening(false);
      if (event.error !== 'aborted' && !isSpeakingRef.current) {
        setTimeout(() => safeRecognition(), 1000);
      }
    };

    recognition.onresult = async (e) => {
      const transcript = e.results[e.results.length - 1][0].transcript.trim();
      console.log('I heard:', transcript);

      if (transcript.toLowerCase().includes(UserData.assistantName.toLowerCase())) {
        const data = await getGeminiResponse(transcript);
        handleCommand(data);
      }
    };

    safeRecognition(); 

    return () => recognition.stop();
  }, []);

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
