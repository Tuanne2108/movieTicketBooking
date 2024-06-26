<<<<<<< HEAD
import React from 'react';
import './App.css';
import Cnema from './Pages/Cnema';


=======
import React, { Fragment } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { routes } from "./Routes";
import DefaultComponent from "./Components/DefaultComponent/DefaultComponent";
import Footer from './Components/Footer/Footer'
import "./FormStyle/style.css";
import 'bootstrap/dist/css/bootstrap.min.css';
>>>>>>> testAPI


function App() {

  return (
<<<<<<< HEAD
    <div className="App">
        <Cnema />
=======
    <div className="defaultBackground">
      <Router>
        <Routes>
          {routes.map((route) => {
            const Page = route.page;
            const Layout = route.isShowHeader ? DefaultComponent : Fragment;
            return (
              <Route
                key={route.path}
                path={route.path}
                element={
                  <>
                    <Layout />
                    <Page />
                    {route.showFooter && <Footer />}
                  </>
                }
              />
            );
          })}
        </Routes>
      </Router>
      
>>>>>>> testAPI
    </div>
  );
}

export default App;
