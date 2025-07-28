import React, { useContext, useState } from 'react';
import { motion } from 'framer-motion';
import bg from '../assets/iron-man.jpg';
import { useNavigate } from 'react-router-dom';
import { UserDataContext } from '../context/UserContext';
import axios from 'axios';

const SignIn = () => {
  const navigate = useNavigate();
  const { serverUrl, UserData , setUserData} = useContext(UserDataContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr("");

    try {
      const result = await axios.post(`${serverUrl}/api/auth/signin`, {
        email,
        password,
      }, { withCredentials: true })
      setUserData(result.data)
      navigate('/');
    } catch (error) {
      console.log(error);
      setUserData(null);
      setErr(error.response?.data?.message || "Something went wrong.");
    }
  };

  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-[90%] max-w-[400px] bg-white/10 backdrop-blur-md rounded-xl
                   shadow-xl p-8 flex flex-col gap-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Sign In</h2>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />
        {err.length > 0 && <p className='text-red-500 text-center'>{err}</p>}

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all"
        >
          Sign In
        </button>

        <p
          className="text-sm text-center cursor-pointer"
          onClick={() => navigate('/signup')}
        >
          Don't have an account?{' '}
          <span className="underline">Sign up</span>
        </p>
      </motion.form>
    </div>
  );
};

export default SignIn;
