import React from 'react'
import { Link } from 'react-router-dom'
import {ArrowLeft, ArrowRight} from 'lucide-react'
const NotFound = () => {
  return (
    <>
        <div className="flex bg-white h-screen w-full flex-col items-center justify-center text-sm max-md:px-4 py-20">
            <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-gray-400 via-gray-300 to-green-500 bg-clip-text text-transparent">
                404 Page Not Found
            </h1>
            <div className="h-px w-xl rounded bg-gradient-to-r from-gray-400 to-gray-800 my-5 md:my-7"></div>
            <p className="md:text-xl text-gray-400 max-w-lg text-center">
                The page you are looking for does not exist or has been moved.
            </p>
            <Link to="/" className="group flex items-center gap-1 bg-green-500 hover:bg-green-400 px-7 py-2.5 text-white font-bold rounded-md mt-10  active:scale-95 transition-all">
                <ArrowLeft  className='size-5'/>
                Back to Home
             
            </Link>
        </div>
  
    </>
  )
}

export default NotFound
