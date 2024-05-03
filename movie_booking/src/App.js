import React from 'react';
import './App.css';
import Navbar from './Components/Navbar/Navbar';
import SearchingBar from './Components/Navbar/SearchingBar'
import CardSlider from './Components/Slider/MultipleItems';
import Cnema from './Pages/Cnema';

import { BrowserRouter, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <div>
        <Navbar />
        <SearchingBar />
        <CardSlider />
    </div>
  );
}

export default App;
