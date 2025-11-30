import mongoose from "mongoose";
const {ObjectId} = mongoose.Schema;
const ScholarshipSchema = new  mongoose.Schema({
    fullName : {
        type:String,
        length:30,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
        length:50
    },
    caste:{
        type:String,
        length:15,
        required:true
    },
    annualFee : {
        type:Number,
        required:true,
    },
    reason:{
        type:String,
        length:100,
        required:true
    },
    user:{
        type:ObjectId,
        ref:"Student"
    }
},{timestamps:true});

export const Scholar = mongoose.model("ScholarshipDB",ScholarshipSchema);