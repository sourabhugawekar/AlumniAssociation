import express from "express";
import {
  postFees,
  postInfrastructure,
  getAllFeesDonations,
  postStudentFeesForm,
  getAllStudentFormDetails,
  getInfraFees,
} from "../controllers/donation.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
const router = express.Router();

router.post("/donation", postInfrastructure);
router.post("/fees", isAuthenticated, postFees);
router.get("/getHistory", getAllFeesDonations);
router.post("/studentScholarshipForm", isAuthenticated, postStudentFeesForm);
router.get("/getAllStudentForm", getAllStudentFormDetails);
router.post("/studentScholarshipForm", isAuthenticated, postStudentFeesForm);
router.get("/getAllStudentForm", getAllStudentFormDetails);
router.get("/getInfraHistory", getInfraFees);
export default router;
