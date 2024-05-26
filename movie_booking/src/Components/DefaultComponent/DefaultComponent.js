import React from 'react'
import Header from '../Header/Header'




const DefaultComponent = ({children}) => {
  return (
    <div className="CnemaHeader">
        <Header />
        {children}

    </div>
  )
}

export default DefaultComponent