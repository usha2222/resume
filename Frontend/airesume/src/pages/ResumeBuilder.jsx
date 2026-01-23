import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, Briefcase, FileText, FolderIcon, GraduationCap, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';
const ResumeBuilder = () => {
  const { resumeId } = useParams();
  console.log(resumeId);
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: '',
    personal_info: {},
    professinal_summary: "",
    experience: [],
    education: [],
    projects: [],
    skills: [],
    template: "classic",
    accent_color: "#9333ea",
    public: false,
  })
  const [activeSectionIndex, setActiveSectionIndex] = useState(0);
  const [removeBackground, setRemoveBackground] = useState(false);
  // const activeSection = sections[activeSectionIndex];

  const loadExistingResume = async () => {
    const resume = dummyResumeData.find(resume => resume._id === resumeId);
    if (resume) {
      setResumeData(resume);
      document.title = resume.title + " - AIResume";

    }
  }
  useEffect(() => {
    loadExistingResume()
  }, [])

  const sections = [
    { id: 'personal_info', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ];
  const activeSection = sections[activeSectionIndex];

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6 '>
        <Link className='inline-flex gap-2 items-center text-slate-600 hover:text-slate-800 transition-all' to='/app'>
          <ArrowLeftIcon className='size-6' />Back to Dashboard
        </Link>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-8'>
        {/* Left section  -form */}
        <div className='grid lg:grid-col-12 gap-8'>
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-2'>
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr  className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
              style={{width: `${activeSectionIndex*100/(sections.length-1)}%`}} />

{/* Section Navigation */}

            </div>

          </div>
          {/* Right section - preview */}
          <div></div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
