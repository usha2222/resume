import React from 'react'
import { Briefcase, Plus, Trash2, Sparkles } from 'lucide-react'

const ExperienceForm = ({ data, onChange }) => {
    const addExperience = () => {
            console.log("hello");

        const newExperience = {

            company: "",
            position: "",
            start_Date: "",
            end_Date: "",
            description: "",
            is_current: false,
        }
        onChange([...data, newExperience])
    }
    const removeExperience = (index) => {
        const updated = data.filter((exp, i) => i !== index)
        onChange(updated)
    }
    const updateExperience = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
    onChange(updated)
    }

    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                {/* left section  */}
                <div className=''>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Professional Experience</h3>
                    <p className='text-sm text-gray-500'>Add your job experience here</p>
                </div>
                {/* right side */}
                <button  onClick={addExperience} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className='size-4' />Add Experience
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 '>
                    <Briefcase className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No experience added yet.</p>
                    <p>Click ''Add Experience'' to add your first experience</p>

                </div>
            ) :
                (<div className='space-y-4'>
                    {data.map((experience, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>

                                <h1 className='font-medium text-gray-700'>Experience #{index + 1} </h1>
                                <button onClick={() => removeExperience(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-5' />
                                </button>

                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <input type="text" name="" value={experience.company || ""} onChange={(e) => updateExperience(index, 'company', e.target.value)} placeholder='Enter Company' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />
                                <input type="text" name="" value={experience.position || ""} onChange={(e) => updateExperience(index, 'position', e.target.value)} placeholder='Enter Position' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />
                                <input type="month" name="" value={experience.start_Date || ""} onChange={(e) => updateExperience(index, 'start_Date', e.target.value)} className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />
                                <input type="month" name=""
                                    disabled={experience.is_current}
                                    value={experience.end_Date || ""} onChange={(e) => updateExperience(index, 'end_Date', e.target.value)} className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none disabled:bg-gray-100' />

                            </div>
                            <label className='flex items-center gap-2 cursor-pointer'>
                                <input type="checkbox" checked={experience.is_current || false} onChange={(e) => updateExperience(index, 'is_current', e.target.checked)} className='rounded border-gray-300 text-blue-600 focus:ring-blue-500'/>
                                <span className='text-sm text-gray-700'>Currently working here</span>
                            </label>
                            <div className='space-y-2'>
                                <div className='flex items-center justify-between'>
                                <label className='text-sm font-medium text-gray-700'> Job Description</label>
                                <button className='flex items-center gap-2 px-3 py-1 text-sm bg-purple-100 text-purple-600 rounded hover:bg-purple-300 transition-colors disabled:opacity-50'>
                                    <Sparkles className='w-3 h-3 '/>
                                    Enhance With AI
                                </button>
                                </div>
                                <textarea rows={4} value={experience.description || ""} onChange={(e)=>updateExperience(index,'description' ,e.target.value)} className='w-full text-sm px-3 py-2 border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none resize-none' placeholder='Describe your key responsibilties and achievements ...'></textarea>
                            </div>
                        </div>
                    ))}

                </div>
                )}
        </div>
    )
}


export default ExperienceForm
