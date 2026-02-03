import { Plus, Sparkles, X } from 'lucide-react'
import React, { useState } from 'react'

const SkillsForm = ({data,onChange}) => {
    const [newSkill,setNewSkill]=useState("")
    const addSkill=()=>{
        if(newSkill.trim() && !data.includes(newSkill.trim())){
            onChange([...data,newSkill.trim()])
            setNewSkill("")
        }
    }
  
    const removeSkill=(resumeIndex)=>{
        onChange(data.filter((_,index)=>index!==resumeIndex))
    }
    const handleKeyPress =(e)=>{
        if(e.key==="Enter"){
            e.preventDefault();
            addSkill()
        }
    
    }
  return (
    <div className='space-y-4'> 
    <div>
        <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Skills</h3>
        <p className='text-sm text-gray-500'>Add your  technical and soft skills here</p>
    </div>
    <div className='flex gap-2 '>
        <input type="text" placeholder='Enter skills (e.g., JS ,CSS,React)'
        className='flex-1 py-2 text-sm px-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none'
        value={newSkill}
        onChange={(e) => setNewSkill(e.target.value)}
        onKeyDown={handleKeyPress} />
        <button onClick={addSkill} className='flex items-center gap-1 px-4 py-2 text-sm bg-blue-500 text-white font-bold rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 '><Plus className='size-5'/>Add</button>
    </div>
      {data.length >0  ? (
        <div className='flex flex-wrap gap-5'> 
          {data.map((skill, index) => (
            <span key={index} className='flex items-center gap-3 px-3 py-1 bg-gray-100 text-blue-800 rounded-md text-xl'>{skill}<button onClick={() => removeSkill(index)} className='ml-1 hover:bg-blue-200 rounded-full p-0.5'><X className='w-5 rounded-2xl border border-gray-400 h-5' /></button></span>
          ))}
        </div>
      )
      :(
        <div className='text-center py-6 text-gray-500'>
            <Sparkles className='w-10 h-10 mx-auto mb-2 text-gray-300'/>
            <p>No skills added yet</p>
            <p className='text-sm'>Add your technical and soft skills above</p>
        </div>
      )}
      <div className='bg-blue-50 p-3 rounded-lg'>
        <p className='text-sm text-blue-800'><strong>Tip:</strong>Add 8-12 relavant skills.Includes both technical skills(programming language,tools and frameworks) and soft skills(leadership,teamwork,communication,etc)</p>
      </div>
    </div>
  )
}

export default SkillsForm
