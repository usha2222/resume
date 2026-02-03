import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import ResumePreview from '../components/ResumePreview';
import Loader from '../components/Loader';
import { ArrowLeft, ArrowLeftIcon, ArrowRight} from 'lucide-react';
import {Link} from 'react-router-dom'


const Preview = () => {
  const {resumeId}=useParams();
  const [resumeData,setResumeData]=useState(null)
  const [loading,setLoading]=useState(true)
  const loadResume=()=>{
    setResumeData(dummyResumeData.find(resume=>resume._id===resumeId||null))
    setLoading(false)
    
  }
  useEffect(()=>{
    loadResume()
  },[])
  return (
    <div>
{resumeData ?(
  <div className='bg-slate-100'>
    <div className='max-w-3xl mx-auto px-4 py-8'>
      <ResumePreview className='py-4 bg-white' data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color}/>
    </div>
  </div>
):(
  <div>
    {loading ? <Loader/>:(
    <div className='flex flex-col items-center justify-center h-screen'>
      <p className='text-center text-6xl text-slate-500'> User not found</p>
    <Link to="/" className="group flex items-center gap-2 bg-green-400 hover:bg-green-300 px-7 py-2.5 text-white font-bold  rounded-md mt-10 font-medium active:scale-95 transition-all">
                <ArrowLeft  className='size-5'/>
                Back to Home             
            </Link>
    
    </div>  
    )}
  </div>
  
)}
    </div>
  )
}

export default Preview
