import mongoose from 'mongoose';

const studentProfileSchema = new mongoose.Schema({
    email:String,
    bio:String,
    location:String,
    phone:String,
    skills:[String],
    profilePhoto:String,
    backgroundImage:String,
    // createdAt:new Date.now(),
},{timestamps:true});
export const StudentProfile = mongoose.model("StudentProfileDB",studentProfileSchema);