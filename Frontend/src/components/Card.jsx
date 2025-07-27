import React, { useContext } from 'react';
import { motion } from 'framer-motion';
import { UserDataContext } from '../context/UserContext';

const Card = ({ image }) => {
  const {
    selectedImage,
    setSelectedImage,
  } = useContext(UserDataContext);

  const isSelected = selectedImage === image;

  const handleClick = () => {
    if (isSelected) {
      setSelectedImage(null); 
    } else {
      setSelectedImage(image); 
    }
  };

  return (
    <motion.div
      initial={{ width: isSelected ? 250 : 80 }}
      animate={{ width: isSelected ? 250 : 80 }}
      whileHover={{
        width: 250,
        scale: 1.05,
        rotateY: 5,
        boxShadow: '0 10px 20px rgba(0,0,255,0.4)',
      }}
      transition={{ type: 'spring', stiffness: 250, damping: 18 }}
      className={`h-[200px] sm:h-[240px] md:h-[280px] rounded-2xl overflow-hidden cursor-pointer duration-300 border-2
        ${isSelected ? 'border-blue-500' : 'border-transparent'} 
        bg-[#030326]`}
      onClick={handleClick}
    >
      <img
        src={image}
        alt="avatar"
        className='w-full h-full object-cover'
      />
    </motion.div>
  );
};

export default Card;
