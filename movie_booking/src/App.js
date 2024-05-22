import React, { Fragment } from 'react';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './Routes'
import DefaultComponent from './Components/DefaultComponent/DefaultComponent'



function App() {
  return (
    <div className="defaultBackground">
      <Router>
        <Routes>
        {routes.map((route) => {
          const Page = route.page
          const Layout = route.isShowHeader ? DefaultComponent : Fragment
          return (
            <Route key={route.path} path={route.path} element = {
            <>
            <Layout />
            <Page />
            
            </>
          } />
          )
        })}
        </Routes>
        
      </Router>
    </div>
    
  );
}

export default App;
