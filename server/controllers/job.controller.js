import { app } from "../app.js";
import { Alumni } from "../models/alumni.model.js";
import { Job } from "../models/jobs.model.js";

export const postJob = async (req, res) => {
  const {
    jobTitle,
    companyName,
    jobLocation,
    jobType,
    jobDescription,
    qualifications,
    applicationLink,
    applicationDeadline,
  } = req.body;

  if (!jobTitle || !jobDescription || !companyName || !jobLocation) {
    return res
      .status(422)
      .json({ error: "Please fill all fields properly ..." });
  }

  try {
    const jobPostExist = await Job.findOne({ jobDescription: jobDescription });

    if (jobPostExist) {
      return res.status(422).json({ error: "Job Post already exist" });
    }

    const job = new Job(req.body);

    const jobPost = await job.save();

    if (jobPost) {
      return res
        .status(201)
        .json({ message: "Job Post Added Successfully ..." });
    } else {
      return res.status(500).json({ error: "Failed to Add" });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllJobsPosts = async (req, res, next) => {
  try {
    const jobs = await Job.find();

    if (jobs) {
      return res.status(200).json(jobs);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO jobs found in database",
    });
  }
};

export const getJobPostById = async (req, res, id) => {
  try {
    const jobPost = await Job.find({ id });

    if (jobPost) {
      return res.status(200).json(jobPost);
    }
  } catch (error) {
    return res.status(400).json({
      error: "NO JobPosts found in database",
    });
  }
};

export const deleteJobPostById = async (req, res, next, id) => {
  try {
    const blogpost = await Blog.findById(id);

    if (!blogpost) {
      return res.status(400).json({
        error: "NO BLog found in database",
      });
    } else {
      const deleteblogpost = await blogpost.remove();
      if (deleteblogpost) {
        console.log(deleteblogpost);
      }
    }

    req.blogpost = { status: "Deleted" };
    next();
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      error: "error",
    });
  }
};

export async function getUser(req, res, next, id) {
  try {
    const user = await Alumni.findById(id);

    if (!user) {
      return res.status(400).json({ error: "User not found" });
    }
    const { fname, lname, email } = user;
    return res.status(200).json({ fname, lname, email });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ error: "Error fetching user" });
  }
}
