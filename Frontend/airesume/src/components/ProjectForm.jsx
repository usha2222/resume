import { Folder, Plus, Trash2 } from 'lucide-react'
import React from 'react'

const ProjectForm = ({ data, onChange }) => {
    const addProject = () => {

        const newProject = {

            name: "",
            type: "",
            description: "",

        }
        onChange([...data, newProject])
    }
    const removeProject = (index) => {
        const updated = data.filter((_, i) => i !== index)
        onChange(updated)
    }
    const updateProject = (index, field, value) => {
        const updated = [...data]
        updated[index] = { ...updated[index], [field]: value }
        onChange(updated)
    }
    return (
        <div className='space-y-6'>
            <div className='flex items-center justify-between'>
                {/* left section  */}
                <div className=''>
                    <h3 className='flex items-center gap-2 text-lg font-semibold text-gray-900'>Project</h3>
                    <p className='text-sm text-gray-500'>Add your projects</p>
                </div>
                {/* right side */}
                <button onClick={addProject} className='flex items-center gap-2 px-3 py-1 text-sm bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors'>
                    <Plus className='size-4' />Add Project
                </button>
            </div>

            <div className='space-y-4'>
                {data?.map((project,index) => (
                    <div key={index} className='p-4 border border-gray-200 rounded-lg space-y-3'>
                        <div className='flex justify-between items-start'>

                            <h1 className='font-medium text-gray-700'>Project #{index + 1} </h1>
                            <button onClick={() => removeProject(index)} className='text-red-500 hover:text-red-700 transition-colors'>
                                <Trash2 className='size-5' />
                            </button>

                        </div>
                        <div className='grid  gap-3'>
                            <input type="text" name="" value={project.name || ""} onChange={(e) => updateProject(index, 'name', e.target.value)} placeholder='Project Name' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />

                            <input type="text" name="" value={project.type || ""} onChange={(e) => updateProject(index, 'type', e.target.value)} placeholder='Project Type' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />

                            <input type="text" name="" value={project.description || ""} onChange={(e) => updateProject(index, 'description', e.target.value)} placeholder='Describe your project' className='px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-1 focus:ring-blue-500 outline-none' />


                        </div>
                    </div>
                ))}

            </div>


        </div>
    )
}

export default ProjectForm
