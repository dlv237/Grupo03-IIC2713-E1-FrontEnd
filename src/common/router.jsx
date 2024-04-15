import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landingpage from '../landingpage';
import Login from '../userpages/login';
import Register from '../userpages/register';

const PageRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Landingpage />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register />} />
    </Routes>
  );
};

export default PageRoutes;
