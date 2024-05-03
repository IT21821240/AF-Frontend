import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../components/Home';
import Register from '../components/Register';
import Login from '../components/Login';
import Apod from '../components/APOD';
import Mars from '../components/Mars';
import Earth from '../components/Earth';
import Epic from '../components/EPIC';
import { useAuth } from '../contexts/AuthContext';

const PrivateRoute = ({ Component }) => { // Destructure Component prop
  const { isLoggedIn } = useAuth();

  return isLoggedIn ? <Component /> : <Navigate to="/login" />;
}

const AppRoutes = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Home />} />
      <Route exact path="/register" element={<Register />} />
      <Route exact path="/login" element={<Login />} />

      {/* Use PrivateRoute component */}
      <Route path="/Apod" element={<PrivateRoute Component={Apod} />} />
      <Route path="/Mars" element={<PrivateRoute Component={Mars} />} />
      <Route path="/Earth" element={<PrivateRoute Component={Earth} />} />
      <Route path="/Epic" element={<PrivateRoute Component={Epic} />} />
    </Routes>
  );
}

export default AppRoutes;
