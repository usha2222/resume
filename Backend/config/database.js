import mongoose from "mongoose";
const connectDb = async () => {
const MONGOOSE_URL=process.env.MONGOOSE_URL
const LOCAL_URL=process.env.LOCAL_URL
    try {
        const conn = await mongoose.connect( LOCAL_URL)
        console.log(`MongoDB Connected: ${conn.connection.host}`)
    } catch(error){
        console.log("Error connecting to MongoDB "+error)
        process.exit(1)
    }
}
export default connectDb