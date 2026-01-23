import { FilePenLineIcon, PencilIcon, Plus, TrashIcon, Upload, UploadCloudIcon, XIcon } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { dummyResumeData } from '../assets/assets'
import { useNavigate } from 'react-router-dom'

const DashBoard = () => {
  const colors = ['#9333ea', '#d946ef', '#dc2626', '#0284c7', '#DB2777', '#EAB308']
  const [allResumes, setAllResumes] = useState([])
  const [showCreateResume, setShowCreateResume] = useState(false);

  const [showUploadResume, setShowUploadResume] = useState(false);
  const [title, setTitle] = useState('');
  const [resume, setResume] = useState(null);
  const [editResumeId, setEditResumeId] = useState('');
  const navigate = useNavigate()

  const loadAllResumes = () => {
    setAllResumes(dummyResumeData)
  }
  const createResume =async (e) => {
    e.preventDefault();
    setShowCreateResume(false);
    navigate(`/app/builder/123`)
  }
  const uploadResume =async (e) => {
    e.preventDefault();
    setShowUploadResume(false);
    navigate(`/app/builder/123`)
  }
  const editTitle =async (e) => {
    e.preventDefault();
    setEditResumeId(false);

  }
  const deleteResume = (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this resume?");
    if (confirmDelete){
    const filteredResumes = allResumes.filter((resume) => resume._id !== id);
    setAllResumes(filteredResumes);
    }
  }
  useEffect(() => {
    loadAllResumes()
  }, [])
  
  return (
    <div className='max-w-7xl mx-auto px-4 py-8'>
      <p className='text-2xl font-medium mb-6 bg-gradient-to-r from-slate-600 to-slate-400 bg-clip-text text-transparent hidden md:block'>Welcome ,Joe deo</p>
      <div className='flex gap-4'>

        <button onClick={() => setShowCreateResume(true)} className='w-full bg-white sm:max-w-40 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-indigo-500 hover:shadow-lg transition-all'>
          <Plus className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-b from-indigo-300 to-indigo-500 text-white rounded-full' />
          <p className='text-sm group-hover:text-indigo-600 transition-all duration-300'>Create Resume</p>
        </button>

        <button onClick={() => { setShowUploadResume(true); console.log("Upload button clicked"); }} className='w-full bg-white sm:max-w-40 h-48 flex flex-col items-center justify-center rounded-lg gap-2 text-slate-600 border border-dashed border-slate-300 group hover:border-purple-500 hover:shadow-lg transition-all'>
          <UploadCloudIcon className='size-11 transition-all duration-300 p-2.5 bg-gradient-to-br from-purple-300  to-purple-500 text-white rounded-full' />
          <p className='text-sm group-hover:text-purple-600 transition-all duration-300'>Upload Existing</p>
        </button>


      </div>
      <div >

        <hr className='border-slate-300 my-6 sm:w-[350px]' />
        <div className='grid grid-cols-2 sm:flex flex-wrap gap-4'>
          {allResumes.map((resume, index) => {
            const baseColor = colors[index % colors.length];
            return (
              <button onClick={()=>navigate(`/app/builder/${resume._id}`)} key={resume.index} className=' relative w-full sm:max-w-40 h-48 flex flex-col items-center justify-center rounded-lg gap-2 border  group hover:shadow-lg shadow-lg transition-all duration-200 cursor-pointer' style={{ background: `linear-gradient(135deg, ${baseColor}10, ${baseColor}40)`, borderColor: baseColor + '40' }}>

                <FilePenLineIcon className='size-8 group-hover:scale-105 transition-all' style={{ color: baseColor }} />
                <p className='  text-sm group-hover:scale-105 transition-all px-2 text-center ' style={{ color: baseColor }}>{resume.title}</p>
                <p className=' absolute bottom-1 text-[13px] text-slate-400 group-hover:text-slate-600 duration-300  text-sm group-hover:scale-105 transition-all px-2 text-center ' style={{ color: baseColor + '90' }}>Upaated on {new Date(resume.updatedAt).toLocaleDateString()} </p>

                <div onClick={(e)=>e.stopPropagation()} className='absolute top-2 right-2 group-hover:flex item-center hidden'>
 
                  <TrashIcon onClick={()=>deleteResume(resume._id)} className='size-8 p-1.5 cursor-pointer hover:bg-white rounded text-slate-700 transition-colors' />
                  <PencilIcon  onClick={()=>{setEditResumeId(resume._id); setTitle(resume.title)}} className='size-8 p-1.5 cursor-pointer hover:bg-white rounded text-slate-700 ' />
                </div>
              </button>

            )
          })}
        </div>
        {showCreateResume && (
          <form onSubmit={createResume}   className='fixed inset-0 bg-black/70 backdrop-blur  flex justify-center bg-opacity-50 z-10  items-center'>
            <div onClick={(e) =>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
            >
              <h2 className='text-xl font-medium'>Create a Resume</h2>
              <input type="text" placeholder=' Enter Resume Title' className='w-full border border-gray-300 rounded-md mt-4 px-4 py-2 focus:border-green-500 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required />
              <button type="submit" className='w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors'>Create Resume</button>
              <XIcon className='absolute top-2 right-2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors ' onClick={() => {setShowCreateResume(false);setTitle('')}} />
            </div>

          </form>
        )}

        {showUploadResume && (
          <form onSubmit={uploadResume}  className='fixed inset-0 bg-black/70 backdrop-blur  flex justify-center bg-opacity-50 z-10  items-center'>
            <div onClick={(e) => e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
            >
              <h2 className='text-xl font-medium'>Upload Resume</h2>
              <input type="text" placeholder=' Enter Resume Title' className='w-full border border-gray-300 rounded-md mt-4 px-4 py-2 focus:border-green-500 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required />
              <div >
                <label htmlFor="resume-input" className='block  mt-4 w-full text-sm text-slate-700'>
                  Select resume file
                  <di className='flex flex-col item-center justify-center gap-2 border group text-slate-400 border-slate-300 border-dashed  rounded-md p-4 py-10 my-4 hover:boder-greeen-500 hover:text-green-700 cursor-pointer transition-colors' >
                    {
                      resume ? <p className='text-green-400'>{resume.name}</p> : (
                        <>
                          <Upload className='size-14 mx-auto' />
                        <p className='text-sm mx-auto group-hover:text-green-400   text-center text-slate-500'>Upload Resume</p>
                        <input type="file"  id="resume-input" accept=".pdf,.doc,.docx" className='mt-2 py-1.5 px-2 my-3 ' onChange={(e) => setResume(e.target.files[0])} required  />
                        </>
                      )
                    }
                  </di>
                </label>
              </div>
              <button type="submit" className='w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors'>Upload Resume</button>
              <XIcon className='absolute top-2 right-2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors ' onClick={() => {setShowUploadResume(false);setTitle('')}} />
            </div>

          </form>

        )}

           {editResumeId && (
          <form onSubmit={editTitle}   className='fixed inset-0 bg-black/70 backdrop-blur  flex justify-center bg-opacity-50 z-10  items-center'>
            <div onClick={(e) =>e.stopPropagation()} className='relative bg-slate-50 border shadow-md rounded-lg w-full max-w-sm p-6'
            >
              <h2 className='text-xl font-medium'>Edit Resume Title</h2>
              <input type="text" placeholder=' Enter Resume Title' className='w-full border border-gray-300 rounded-md mt-4 px-4 py-2 focus:border-green-500 outline-none' value={title} onChange={(e) => setTitle(e.target.value)} required />
              <button type="submit" className='w-full bg-green-500 text-white py-2 rounded-lg mt-4 hover:bg-green-600 transition-colors'>Update Title</button>
              <XIcon className='absolute top-2 right-2 cursor-pointer text-slate-400 hover:text-slate-600 transition-colors ' onClick={() => {setEditResumeId(false); setTitle('')}} />
            </div>

          </form>
        )}

      </div>


    </div>
  )
}

export default DashBoard
