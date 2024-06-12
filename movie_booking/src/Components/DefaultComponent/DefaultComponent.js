import React from 'react'
import Header from '../Header/Header'
import Footer from '../Footer/Footer';



const DefaultComponent = ({children}) => {
  return (
    <div className="DefaultComponent">
      <div className='DefaultComponent_Container'>
        <Header />
        {children}
      </div>
    </div>
  )
}

export default DefaultComponent