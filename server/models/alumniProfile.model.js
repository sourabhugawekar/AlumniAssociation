import mongoose from "mongoose";

const alumniProfileSchema = new mongoose.Schema(
  {
    email: String,
    bio: String,
    location: String,
    phone: String,
    skills: [String],
    profilePhoto: String,
    backgroundImage: String,
    // createdAt:new Date.now(),
  },
  { timestamps: true }
);
export const AlumniProfile = mongoose.model(
  "AlumniProfile",
  alumniProfileSchema
);
