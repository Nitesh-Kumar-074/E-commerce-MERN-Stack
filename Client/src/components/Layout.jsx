import React from 'react'
import {Outlet} from 'react-router-dom'
import Navigation from './Navigation/Navigation.jsx'
import CartTab from '../Pages/CartTab.jsx'
import {useSelector} from 'react-redux'
import Footer from './Footer.jsx'

function Layout() {
  return (
    <div>
        <Navigation/>
        <Outlet/>  
        <Footer/>    
    </div>
  )
}

export default Layout