import React, { useState } from 'react';
import InputForm from './Pages/InputForm/InputForm';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './App.css'
import Navbar from './Pages/Navbar/Navbar';
import LandingPage from './Pages/LandingPage/LandingPage';
import SimulationLandingPage from './Pages/SimulationLandingPage/SimulationLandingPage';
import SimulationForm from './Pages/SimulationForm/SimulationForm';

const App = () => {

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path='/' element={<LandingPage />}></Route>
        <Route path='/form' element={<InputForm />}></Route>
        <Route path='/simulationLandingPage' element={<SimulationLandingPage />}></Route>
        <Route path='/simulationForm' element={<SimulationForm />}></Route>
      </Routes>

    </BrowserRouter>
  );
};

export default App;
