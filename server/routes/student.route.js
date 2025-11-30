import express from "express";
import { deleteStudentProfile, getAllStudentDetails } from "../controllers/student.controller.js";

const router = express.Router();

router.get("/studentdetails", getAllStudentDetails);
router.delete("/delete/",deleteStudentProfile);
export default router;
