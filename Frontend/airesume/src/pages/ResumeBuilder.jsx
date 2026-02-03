import React, { act, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { dummyResumeData } from '../assets/assets';
import { ArrowLeftIcon, Briefcase, ChevronLeft, ChevronRight, DownloadIcon, EyeIcon, EyeOff, FileText, FolderIcon, GraduationCap, Share2Icon, Sparkles, User } from 'lucide-react';
import { Link } from 'react-router-dom';
import PersonalInfoForm from '../components/PersonalInfoForm';
import ResumePreview from '../components/ResumePreview';
import TemplateSelector from '../components/TemplateSelector';
import ColorPicker from '../components/ColorPicker';
import ProffesionalSummaryForm from '../components/ProffesionalSummaryForm';
import ExperienceForm from '../components/ExperienceForm';
import EducationForm from '../components/EducationForm';
import ProjectForm from '../components/ProjectForm';
import SkillsForm from '../components/SkillsForm';
const ResumeBuilder = () => {
  const { resumeId } = useParams();
  console.log(resumeId);
  const [resumeData, setResumeData] = useState({
    _id: "",
    title: '',
    personal_info: {},
    professional_summary: "",
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
      document.title = resume.title + " - AI Resume";

    }
  }
  useEffect(() => {
    loadExistingResume()
  }, [])

  const sections = [
    { id: 'personal', name: 'Personal Info', icon: User },
    { id: 'summary', name: 'Summary', icon: FileText },
    { id: 'experience', name: 'Experience', icon: Briefcase },
    { id: 'education', name: 'Education', icon: GraduationCap },
    { id: 'projects', name: 'Projects', icon: FolderIcon },
    { id: 'skills', name: 'Skills', icon: Sparkles },
  ];
  const activeSection = sections[activeSectionIndex];

  const changeResumeVisiability=()=>{
    setResumeData({...resumeData,public:!resumeData.public})
  }
  const handleShare=()=>{
    const froontendUrl=window.location.href.split('/app/')[0];
    const resumeUrl=froontendUrl+'/view/'+resumeId;
    if(navigator.share){
navigator.share({url:resumeUrl,text:"My Resume"})
    }
    else{
      alert("share not supported in this browser")
    }
  }
  const downloadResume=()=>{
    window.print();
  }

  return (
    <div>
      <div className='max-w-7xl mx-auto px-4 py-6  '>
        <Link className='inline-flex gap-2 items-center  text-slate-600 hover:text-slate-800 transition-all' to='/app'>
          <ArrowLeftIcon className='size-6' />Back to Dashboard
        </Link>
      </div>
      <div className='max-w-7xl mx-auto px-4 pb-8'>

        {/* Left section  -form */}
        <div className='grid lg:grid-cols-12 gap-8 '>
          <div className='relative lg:col-span-5 rounded-lg overflow-hidden'>
            <div className='bg-white rounded-lg shadow-sm border border-gray-200 p-6 pt-2'>
              {/* Progress bar using activeSectionIndex */}
              <hr className='absolute top-0 left-0 right-0 border-2 border-gray-200' />
              <hr className='absolute top-0 left-0 h-1 bg-gradient-to-r from-green-500 to-green-600 border-none transition-all duration-2000'
                style={{ width: `${activeSectionIndex * 100 / (sections.length - 1)}%` }} />

              {/* Section Navigation */}

              <div className='flex justify-between items-center mb-6 border-b-border-gray-300 py-1  '>
                <div className='flex items-center gap-2'>
                  <TemplateSelector selectedTemplate={resumeData.template} onChange={(template) => setResumeData(prev => ({ ...prev, template }))} />

                  <ColorPicker selectedColor={resumeData.accent_color} onChange={(color) => setResumeData(prev => ({ ...prev, accent_color: color }))} />
                </div>
                <div className='flex items-center'>
                  {activeSectionIndex !== 0 && (
                    <button className='flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all' disabled={activeSectionIndex === 0} onClick={() => setActiveSectionIndex(prev => prev - 1)}><ChevronLeft className='size-6' />Previous</button>

                  )}
                  <button className={`flex items-center gap-1 p-3 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 transition-all ${activeSectionIndex === sections.length - 1 && 'opacity-50'}`} disabled={activeSectionIndex === sections.length - 1} onClick={() => setActiveSectionIndex(prev => prev + 1, sections.length - 1)}>Next<ChevronRight className='size-6' /> </button>

                </div>
              </div>
              {/* Form content */}
              <div className='space-x-6'>
                {activeSection.id === 'personal' &&
                  (
                    <PersonalInfoForm data={resumeData.personal_info} onChange={(data) => setResumeData({ ...resumeData, personal_info: data })} removeBackground={removeBackground} setRemoveBackground={setRemoveBackground} />
                  )
                }
                {activeSection.id === 'summary' &&
                  (
                    <ProffesionalSummaryForm data={resumeData.professional_summary} onChange={(data) => setResumeData({ ...resumeData, professional_summary: data })} setResumeData={setResumeData} />
                  )
                }
                {activeSection.id === 'experience' &&
                  (
                    <ExperienceForm data={resumeData.experience} onChange={(data) => setResumeData({ ...resumeData, experience: data })} />
                  )}

                {activeSection.id === 'education' &&

                  (
                    <EducationForm data={resumeData.education} onChange={(data) => setResumeData({ ...resumeData, education: data })} />
                  )}

                {activeSection.id === 'projects' &&
                  (<ProjectForm data={resumeData.projects} onChange={(data) => setResumeData({ ...resumeData, projects: data })} />
                  )}
                {activeSection.id === 'skills' &&
                  (
                    <SkillsForm data={resumeData.skills} onChange={(data) => setResumeData({ ...resumeData, skills: data })} />
                  )}
              </div>

              <button  className='bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring:hover-green-500 transition-all rounded-md px-6 py-2 mt-6 text-sm'>Save Changes</button>
            </div>

          </div>
          {/* Right section - preview */}
          <div className='lg:col-span-7 mt-6 lg:mt-0'>
            {/* buttons */}

            <div className='relative w-full '>
              <div className='absolute bottom-3 left-0 right-0 flex items-center justify-end gap-2'>
                {resumeData.public && (
                  <button onClick={handleShare} className=' flex items-center gap-2 font-bold bg-gradient-to-br from-blue-100 to-blue-200 ring-blue-300 text-blue-600 ring:hover-blue-500 transition-all rounded-md px-6 py-2 mt-6 text-sm'><Share2Icon className='size-4' />Share</button>
                )}
                <button onClick={changeResumeVisiability} className=' flex items-center gap-2 font-bold bg-gradient-to-br from-purple-100 to-purple-200 ring-purple-300 text-purple-600 ring:hover-blue-500 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
                  {resumeData.public?<EyeIcon className='size-4'/>:<EyeOff className='size-4'/>}
                  {resumeData.public?"Public":"Private"}
                </button>

                  <button onClick={downloadResume} className=' flex items-center gap-2 font-bold bg-gradient-to-br from-green-100 to-green-200 ring-green-300 text-green-600 ring:hover-blue-500 transition-all rounded-md px-6 py-2 mt-6 text-sm'>
               <DownloadIcon className='size-4' />Download
                </button>
             
             

              </div>

            </div>
            {/* preview */}
            <ResumePreview data={resumeData} template={resumeData.template} accentColor={resumeData.accent_color} />
            <div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ResumeBuilder
