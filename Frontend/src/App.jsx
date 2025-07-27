import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; 
import Customize from './pages/Customize';
import Home from './pages/Home'; 
import { UserDataContext } from './context/userContext';

const App = () => {
  const { userData, setUserData } = useContext(UserDataContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          userData?.assistantImage && userData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route path="/signin" element={!userData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={!userData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/customize" element={userData ? <Customize /> : <Navigate to="/signin" />} />
    </Routes>
  );
};

export default App;
