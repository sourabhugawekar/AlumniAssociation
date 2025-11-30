import express from "express";
import { deleteAlumniUser, getAllAlumniDetails, postSendMail } from "../controllers/alumni.controller.js";

const router = express.Router();

router.get("/alumnidetails", getAllAlumniDetails);
router.post("/sendmail",postSendMail);
router.delete("/:id",deleteAlumniUser);
export default router;
