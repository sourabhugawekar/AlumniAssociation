import express from "express";
import {
  getAllFeedbacks,
  submitFeedback,
} from "../controllers/feedback.controller.js";

const router = express.Router();

router.post("/contact", submitFeedback);
router.get("/getfeedbacks", getAllFeedbacks);

export default router;
