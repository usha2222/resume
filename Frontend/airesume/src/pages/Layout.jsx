import React from 'react'
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import DashBoard from './DashBoard'

const Layout = () => {
  return (
    <div>
      <div className='min-h-screen bg-gray-50  '>
        <NavBar/>
        <Outlet/>
        </div>
    </div>
  )
}

export default Layout
