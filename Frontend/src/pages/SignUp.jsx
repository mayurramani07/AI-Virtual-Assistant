import React from 'react';
import { motion } from 'framer-motion';
import bg from '../assets/iron-man.jpg';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
  const navigate = useNavigate();
  return (
    <div
      className="w-full h-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${bg})` }}
    >
      <motion.form
        initial={{ opacity: 0, scale: 0.8, y: 50 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
        className="w-[90%] max-w-[400px] bg-white/10 backdrop-blur-md rounded-xl
                   shadow-xl p-8 flex flex-col gap-6 text-white"
      >
        <h2 className="text-3xl font-bold text-center">Sign Up</h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />
        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white focus:outline-none"
        />

        <button
          type="submit"
          className="w-full bg-white text-black font-semibold py-3 rounded-lg hover:bg-gray-200 transition-all"
        >
          Create Account
        </button>

        <p className="text-sm text-center" onClick={()=> navigate("/signin")}>
          Already have an account? <span className="underline cursor-pointer">Sign in</span>
        </p>
      </motion.form>
    </div>
  );
};

export default SignUp;
