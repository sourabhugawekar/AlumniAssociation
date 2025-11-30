import express from "express";
import {
  getLogout,
  getProfile,
  getUserProfile,
  postForgotPassword,
  postLogin,
  postRegister,
  postResetPassword,
  putSetProfile,
  putSetProfileStudent,
  updateUser,
} from "../controllers/user.controller.js";
import { isAuthenticated } from "../middlewares/auth.middleware.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = express.Router();

// Get Api
router.get("/logout", getLogout);
router.get("/profile", isAuthenticated, getProfile);
router.get("/userprofile", isAuthenticated, getUserProfile);
// Post Api
router.post("/signup", postRegister);
router.post("/login", postLogin);
router.post("/forgotpassword",postForgotPassword);
router.post("/resetpassword/:token",postResetPassword);

router.put(
  "/setprofile",
  isAuthenticated,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  putSetProfile
);
router.post(
  "/updateprofile",
  isAuthenticated,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  updateUser
);

router.put(
  "/setprofilestudent",
  isAuthenticated,
  upload.fields([
    { name: "profilePhoto", maxCount: 1 },
    { name: "backgroundImage", maxCount: 1 },
  ]),
  putSetProfileStudent
);

export default router;
