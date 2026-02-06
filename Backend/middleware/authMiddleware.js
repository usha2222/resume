import jwt from 'jsonwebtoken'

const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        token = req.headers.authorization.split(' ')[1];
    }

    if (!token) {
        return res.status(401).json({ success: false, message: "Unauthorized: No token provided" })
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRETE)
        req.userId = decoded.userId
        next();
    } catch (error) {
        return res.status(401).json({ success: false, message: "Unauthorized: Invalid token" })
    }

}
export default protect
// import jwt from 'jsonwebtoken'
// const protect=async(req,res,next)=>{

// const token =req.headers.authorization;
// console.log(token)
// if(!token){
//     return res.status(401).json({success:false,message:"Unauthorized"})
// }
// try{
//     const decoded=jwt.verify(token,process.env.JWT_SECRETE)
//     req.userId=decoded.userId
// next();
// }
// catch(error){
//     return res.status(401).json({success:false,message:"Unauthorized"})
// }


// }
// export default protect