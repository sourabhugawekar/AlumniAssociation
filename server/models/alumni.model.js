import mongoose from "mongoose";

const alumniSchema = new mongoose.Schema(
  {
    fname: String,
    lname: String,
    email: { type: String, trim: true, unique: true },
    password: String,
    gender: String,
    // role:String,
    yearOfAdmission: Number,
    yearOfGraduation: Number,
    field: String,
  },
  { timestamps: true }
);

export const Alumni = mongoose.model("AlumniDB", alumniSchema);
