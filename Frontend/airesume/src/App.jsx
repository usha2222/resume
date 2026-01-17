import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Layout from './pages/Layout'
import ResumeBuilder from './pages/ResumeBuilder'
import Preview from './pages/Preview.jsx'
import DashBoard from './pages/DashBoard.jsx'
import NotFound from './pages/NotFound.jsx'
const App = () => {
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />

        <Route path='app' element={<Layout />}>
          <Route index element={<DashBoard />} />
          <Route path='builder/:resumeId' element={<ResumeBuilder />} />
        </Route>
        <Route path='view/:resumeId' element={<Preview />} />
        <Route path='login' element={<Login />} />
        <Route path='*' element={<NotFound/>}/>
      </Routes>
    </>
  )
}

export default App
