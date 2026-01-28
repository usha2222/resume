import { GraduationCap, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const EducationForm = ({data,onChange}) => {
    const addEducaion = () => {

        const newEducation = {

            institution: "",
            degree: "",
            field: "",
            graduation_date: "",
            gpa: "",
        }
        onChange([...data, newEducation])
    }
    const removeEducation = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }
    const updateEducation = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                {/* left section  */}
                <div className=''>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Education</h3>
                    <p className='text-sm text-gray-500'>Add your education details here</p>
                </div>
                {/* right side */}
                <button onClick={addEducaion} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className='size-4' />Add Education
                </button>
            </div>
            {data.length === 0 ? (
                <div className='text-center py-8 text-gray-500 '>
                    <GraduationCap className='w-12 h-12 mx-auto mb-3 text-gray-300' />
                    <p>No education added yet.</p>
                    <p>Click ''Add Education'' to get Started</p>

                </div>
            ) :
                (<div className='space-y-4'>
                    {data.map((education, index) => (
                        <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                            <div className='flex justify-between items-start'>

                                <h1 className='font-medium text-gray-700'>Education #{index + 1} </h1>
                                <button onClick={() => removeEducation(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                    <Trash2 className='size-5' />
                                </button>

                            </div>
                            <div className='grid grid-cols-2 gap-3'>
                                <input type="text" name="" value={education.institution || ""} onChange={(e) => updateEducation(index, 'institution', e.target.value)} placeholder='Institution Name' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />

                                <input type="text" name="" value={education.degree || ""} onChange={(e) => updateEducation(index, 'degree', e.target.value)} placeholder='Enter Degree(e.g., Bachelor of Science, Master of Science)' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />
                                <input type="text" name="" value={education.field || ""} onChange={(e) => updateEducation(index, 'field', e.target.value)} placeholder='Enter Field of Study' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />


                                <input type="month" name="" value={education.graduation_date || ""} onChange={(e) => updateEducation(index, 'graduation_date', e.target.value)} className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />


                                <input type="text" name="" value={education.gpa || ""} onChange={(e) => updateEducation(index, 'gpa', e.target.value)} placeholder='Enter gpa(optional)' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />
                            </div>   
                        </div>
                    ))}

                </div>
                )}
        </div>
    )
}

export default EducationForm
