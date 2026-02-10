import imageKit from "../config/imageKit.js";
import Resume from "../models/Resumes.js";
import fs from 'fs'
//controller for creating a new resume
//POST: /api/resumes/create
export const createResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { title } = req.body
        //create new resume
        const newResume = await Resume.create({ userId, title })
        return res.status(200).json({ success: true, message: "Resume created Successfully", resume: newResume })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, })

    }
}
//controller for deleting a resume
//POST: /api/resumes/delete

export const deleteResume = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        //delete new resume
        const deletedResume = await Resume.findOneAndDelete({ userId, _id: resumeId })
        if (!deletedResume) {
            return res.status(400).json({ success: false, message: "Resume not found or already deleted" })
        }
        //return success message
        return res.status(200).json({ success: true, message: "Resume deleted Successfully" })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, })

    }
}
//controller get resume bu id
//GET: /api/resumes/get
export const getResumeById = async (req, res) => {
    try {
        const userId = req.userId;
        const { resumeId } = req.params;
        //delete new resume
        const resume = await Resume.findOne({ userId, _id: resumeId })
        if (!resume) {
            return res.status(400).json({ success: false, message: "Resume not found" })
        }

        resume._v = undefined;
        resume.createdAt = undefined;
        resume.updatedAt = undefined;
        //return success message
        return res.status(200).json({ success: true, message: "Resume get Successfully", resume: resume })
    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, })

    }
}
//get resume by id public
//GET:api/resumes/public

export const getPublicResumeById = async (req, res) => {
    try {
        const { resumeId } = req.params;
        const resume = await Resume.findOne({ public: true, _id: resumeId });
        if (!resume) {
            return res.status(400).json({ success: false, message: "Resume not found" })
        }
        //return success message
        return res.status(200).json({ success: true, message: "Resume get Successfully", resume: resume })

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message, })

    }
}
//constroller for udating a resume
//PUT:/api/resumes/update
export const updateResume = async (req, res) => {
    try {
        const { resumeId, resumeData, removeBackground } = req.body;
        const userId = req.userId;
        const image = req.file;
    
        console.log(resumeData)
        let resumeDataCopy = JSON.parse(resumeData)

        if (image) {
            const imageBufferData=fs.createReadStream(image.path)

            const response = await imageKit.files.upload({
                file:imageBufferData ,
                fileName: 'resume.jpg',
                folder:'user-resumes',
                transformation:{
                    pre:'w-300,h-300 ,fo-face,z-0.75' +
                   ( removeBackground ? ',e.bgremove' : '')
                }
            });
            resumeDataCopy.personal_info.image=response.url
        }
        
        const resume = await Resume.findOneAndUpdate({ userId, _id: resumeId }, resumeDataCopy, { new: true });
        return res.status(200).json({ success: true, message: 'Saved Successfully', resume: resume })


    }

    catch (error) {
        return res.status(400).json({ success: false, message: error.message, })

    }
}



export default {createResume, deleteResume ,getResumeById,getPublicResumeById,updateResume}