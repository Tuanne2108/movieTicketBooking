import React from 'react'
import Navbar from '../Components/Navbar/Navbar';
import SearchingBar from '../Components/Navbar/SearchingBar'
import FilmSlider from '../Components/Container/FilmSlider';
import VoucherSlider from '../Components/Container/VoucherSlider';
import News from '../Components/News/mainpage_news';
import YouMayInterst from '../Components/Container/YouMayInterest'
import '../Styles/styles.css'
import '../Pages/styles/Cnema.css'

// import { BrowserRouter, Routes, Route } from 'react-router-dom';

const Cnema = () => {
  return (
    <div className="cnema">
      <div className="header">
        <Navbar />
      </div>
      <div className="homepage">
        <SearchingBar />
        <FilmSlider />
        <VoucherSlider />
        <News />
        <YouMayInterst />
      </div>
      <div className="footer">
        
      </div>
      
      
    </div>
  )
}

export default Cnema
