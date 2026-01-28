import { BriefcaseBusiness, Linkedin, Mail, MapPin, Phone, User, User2 } from 'lucide-react'
import React from 'react'

const PersonalInfoForm = ({ data, onChange, removeBackground, setRemoveBackground }) => {
    const handleChange = (field, value) => {
        // const { name, value } = e.target
        onChange({ ...data, [field]: value })
    }
    const fields = [
        { key: "full_name", label: "Full Name", icon: User2, type: "text", required: true },
        { key: "email", label: "Email", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone", icon: Phone, type: "tel" },
        { key: "location", label: "Location", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type: "text" },
        {key: "linkedin", label: "Linkedin Profile", icon: Linkedin,type: "url" },
        { key: "website", label: " Personal Website", icon: MapPin, type: "url" },

    ]
    return (
        <div>
            <h3>Personal Information</h3>
            <p>Get Started with your personal details</p>
            <div className='flex items-center gap-2'>
                <label>
                    {data.image ? (<img src={typeof data.image === 'string' ? data.image : URL.createObjectURL(data.image)} alt="user image" className="w-16 h-16 rounded-full object-cover mt-5 ring-slate-300 hover:opacity-75" />) : (
                        <div className="inline-flex items-center gap-2 mt-5 text-slate-500 hover:text-slate-700 cursor-pointer">
                            <User className='size-8  rounded-full border p-2.5 text-gray-400' />Upload user image
                        </div>
                    )}
                    <input type='file' accept="image/jpeg,image/png,image/jpg" name='image' className='hidden' onChange={((e) => handleChange('image', e.target.files[0]))} />
                </label>
                {typeof data.image === 'object' && (
                    <div className='flex flex-col gap-1 pl-4 text-sm'>
                        <p className='text-slate-600'>Remove Background</p>
                        <label className='relative inline-flex items-center cursor-pointer'>
                            <input type='checkbox'
                                checked={removeBackground}
                                onChange={() => setRemoveBackground(!removeBackground)}
                                className='sr-only peer' />
                            <div className='w-10 h-6 bg-slate-300 rounded-full peer-checked:bg-green-600 transition-colors duration-200'>
                            </div>
                            <span className='dot absolute left-1 top-1 w-4 h-4   bg-white rounded-full transition-transform duration-200 ease-in-out peer-checked:translate-x-4'></span>
                        </label>


                    </div>
                )}
            </div>
            {fields.map((field, index) => {
                const Icon = field.icon;
                return (
                    <div className='space-y-1 mt-5'>
                        <label className='flex items-center gap-2 text-sm font-medium text-slate-600'>
                            <Icon className='size-4' />
                            {field.label}
                            {field.required && <span className='text-red-500'>*</span>}

                        </label>
                        <input type={field.type}
                         name={field.key} value={data[field.key] || ""} onChange={(e) => handleChange(field.key, e.target.value)} required={field.required}  className='mt-1 w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring focus:ring-blue-500 focus:border-blue-400 outline-none transition-colors text-sm ' placeholder={`Enter your ${field.label}`}  />
                    </div>
                )
            })}
        </div>

    )
}

export default PersonalInfoForm
