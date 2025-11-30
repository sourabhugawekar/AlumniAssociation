import express from "express";
import {
  getAllEventDetails,
  postEventDetails,
} from "../controllers/event.controller.js";

const router = express.Router();

router.post("/postevent", postEventDetails);
router.get("/getEvent", getAllEventDetails);
export default router;
