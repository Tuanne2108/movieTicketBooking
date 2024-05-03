import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import SearchingBar from '../Components/Navbar/SearchingBar'
import FilmSlider from '../Components/Slider/FilmSlider';
import '../Styles/styles.css'
import '../Pages/styles/Cnema.css'

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Cnema = () => {
  return (
    <div className="homepage-cnema">
      <Navbar />
      <SearchingBar />
      <FilmSlider />
    </div>
  )
}

export default Cnema
