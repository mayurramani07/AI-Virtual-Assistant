import React, { useContext } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp'; 
import Customize from './pages/Customize';
import Customize2 from './pages/Customize2';
import Home from './pages/Home'; 
import { UserDataContext } from './context/UserContext';

const App = () => {
  const { UserData } = useContext(UserDataContext);

  return (
    <Routes>
      <Route
        path="/"
        element={
          UserData?.assistantImage && UserData?.assistantName ? (
            <Home />
          ) : (
            <Navigate to="/customize" />
          )
        }
      />
      <Route path="/signin" element={!UserData ? <SignIn /> : <Navigate to="/" />} />
      <Route path="/signup" element={!UserData ? <SignUp /> : <Navigate to="/" />} />
      <Route path="/customize" element={UserData ? <Customize /> : <Navigate to="/signin" />} />
      <Route path="/customize2" element={UserData ? <Customize2 /> : <Navigate to="/signin" />} />
    </Routes>
  );
};

export default App;