import React from 'react'
import Navbar from './nav/Navbar'
import { Outlet } from 'react-router-dom'
import Footer from './Footer'

const SharedLayout = () => {
  return (
    <div>
        <Navbar/>
        <div style={{backgroundColor: '#f3f2ee', minHeight:'90vh'}}>
        <Outlet/>
        </div>
    </div>
  )
}

export default SharedLayout