import mongoose from "mongoose";

const FeesSchema = new mongoose.Schema({
  studentName:String,
  category:String,
  fees:Number,
  payFee:Number,
  phoneNumber: String,
},{timestamps:true});

export const Fee = mongoose.model("FeeDB", FeesSchema);
