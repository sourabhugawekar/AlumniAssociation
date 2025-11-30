import mongoose from "mongoose";

const { ObjectId } = mongoose.Schema;

const JobsSchema = new mongoose.Schema(
  {
    jobTitle: String,
    companyName: String,
    jobLocation: String,
    jobType: String,
    jobDescription: String,
    skillSet: String,
    applicationLink: String,
    applicationDeadline: Date,
    user: {
      type: ObjectId,
      ref: "Alumni",
    },
  },
  { timestamps: true }
);

export const Job = mongoose.model("JobDB", JobsSchema);
