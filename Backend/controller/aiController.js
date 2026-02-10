

import openai from "../config/ai.js"
import Resume from "../models/Resumes.js"
//controller for enhancing a resume's professional summary
//POST: /api/ai/enhance-pro-sum
export const enhanceProfessionalSummary = async (req, res) => {
    try {
        const { useContext } = req.body

        if (!useContext) {
            return res.status(400).json({ success: false, message: "Context is required" })
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing .Your task is to enhance the professional summary of a resume .The summary should be 1-2 sentences also highlighting key skills,expericence ,and career objective .Make it completing and ATS-friendly.and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: useContext
                },
            ],
        })
        const enhancedSummary = response.choices.message.content;
        return res.status(200).json({ success: true, message: "Summary enhanced successfully", enhancedSummary: enhancedSummary })

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}
//controller for enhancing a resume's job description
//POST: /api/ai/enhance-job-des

export const enhanceJobDescription = async (req, res) => {
    try {
        const { useContext } = req.body

        if (!useContext) {
            return res.status(400).json({ success: false, message: "Context is required" })
        }
        const response = await openai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: "You are an expert in resume writing .Your task is to enhance the job description of a resume .The job description should be 1-2 sentences also highlighting key responsibilities and achievements.Use action verbs and quantifiable results where possible.Make it ATS-friendly.and only return text no options or anything else."
                },
                {
                    role: "user",
                    content: useContext,
                },
            ],
        })
        const enhancedContent = response.choices.message.content;
        return res.status(200).json({ success: true, message: "Job Description enhanced successfully", enhancedSummary: enhancedContent })

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}
//controller for uploading a resume to the database
//POST: /api/ai/upload-resume
export const uploadResume = async (req, res) => {
    try {
        const { resumeText, title } = req.body
        const userId = req.userId;


        if (!resumeText) {
            return res.status(400).json({ success: false, message: "Context is required" })

        }
        const systemPrompt = "Your are an expert AI agent to extract data from resume "
        const userPrompt = `extract data from the resume  ${resumeText}
        Provide data in the following json format with no additonal text before or after : 
        {    professional_summary:{
        type:String,
        default:''
    },

     skills:{
        type:String,
    },
    personal_info:{
        image:{type:String,default:''},
        full_name:{type:String,default:''},
        profession:{type:String,default:''},
        email:{type:String,default:''},
        phone:{type:String,default:''},
        location:{type:String,default:''},
        linkedin:{type:String,default:''},
        website:{type:String,default:''},
    },
    experience:[
        {
            company:{type:String},
            position:{type:String},
            start_date:{type:String},
            end_date:{type:String},
            description:{type:String},
            is_current:{type:Boolean},  
        }
    ],

    project:[
        {
            name:{type:String},
            type:{type:String},
            description:{type:String},
        }
    ],
     education:[
        {
            institution:{type:String},
            degree:{type:String},
            field:{type:String},
            graduation_date:{type:String},
            gpa:{type:String},
        }
    ]
        `;
        const response = await openai.chat.completions.create({
            model: process.env.OPEN_AI_MODEL,
            messages: [
                {
                    role: "system",
                    content: systemPrompt
                },
                {
                    role: "user",
                    content: userPrompt,
                },
            ],
            response_format: {
                type: "json_object",
            },

        })

        const extractedData = response.choices[0].message.content;
        const parseData = JSON.parse(extractedData);
        const newResume = await Resume.create({
            userId,
            title,
            ...parseData
        })

        return res.status(200).json({ success: true, message: "Resume uploaded successfully", resume: newResume })

    }
    catch (error) {
        return res.status(400).json({ success: false, message: error.message })
    }

}


export default { enhanceProfessionalSummary, enhanceJobDescription,uploadResume } 