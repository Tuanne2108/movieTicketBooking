import React from 'react'
import Header from '../Components/Navbar/Navbar';
import Footer from '../Components/Navbar/Footer'
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
        <Header />
      </div>
      <div className="homepage">
        <SearchingBar />
        <FilmSlider />
        <VoucherSlider />
        <News />
        <YouMayInterst />
      </div>
      <div className="footer">
        <Footer />
      </div>
      
      
    </div>
  )
}

export default Cnema
