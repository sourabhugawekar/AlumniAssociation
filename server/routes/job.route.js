import express from "express";
import {
  postJob,
  getAllJobsPosts,
  deleteJobPostById,
  getJobPostById,
  getUser,
} from "../controllers/job.controller.js";

const router = express.Router();

router.param("id", getUser);

// Post Api
router.post("/postjob", postJob);

//Get api
router.get("/getuser/:id", getUser);
router.get("/getAllJobPosts", getAllJobsPosts);
router.get("/deletePost", deleteJobPostById);
router.get("/getPost", getJobPostById);

export default router;
