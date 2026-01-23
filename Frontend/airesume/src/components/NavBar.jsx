import React from 'react'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
const NavBar = () => {
    const user={name:"John Doe"}
    const navigate=useNavigate();
    const logOutUser=()=>{
        navigate('/')
    }
  return (
    <div className="shadow bg-white">
      <nav className='flex items-center justify-between max-w-7xl mx-auto px-4 py-2 text-slate-800 transition-all'>

<Link to='/'>
<img src="/logo.svg" alt="" className='h-12 w-auto' />
</Link>
<div className='flex items-center gap-4 text-sm'>
    <p>Hi ,{user?.name}</p>
    <button className='bg-white hover:bg-slate-50 border border-gray-300 px-7 py-1.5 rounded-full active:scale-95 transition-all' onClick={logOutUser}>Logout</button>
</div>
      </nav>
    </div>
  )
}

export default NavBar
