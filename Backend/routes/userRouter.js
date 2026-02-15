import express from 'express'
import { getUserById, getUserResumes, loginUser, registerUser, resetPassword, sendResetOpt} from '../controller/userController.js';
import protect from '../middleware/authMiddleware.js';
const userRouter=express.Router();
userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)
userRouter.get('/data',protect,getUserById)

userRouter.post('/send-reset-otp',sendResetOpt)
userRouter.post('/reset-password',resetPassword)
userRouter.get('/resumes',protect,getUserResumes)


export default userRouter;