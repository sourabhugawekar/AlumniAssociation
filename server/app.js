import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyparser from "body-parser";
export const app = express();
// import { User } from "./models/user.model.js";

// Routes Importing
import userRouter from "./routes/user.route.js";
import feedbackRoutes from "./routes/feedback.route.js";
import DonationRoutes from "./routes/donation.route.js";
import JobRoutes from "./routes/job.route.js";
import AlumniRoutes from "./routes/alumni.route.js";
import StudentRoutes from "./routes/student.route.js";
import eventRoutes from "./routes/event.route.js";

dotenv.config({ path: "./.env" });

// app.use(express.urlencoded({extended:true}));

app.use(bodyparser.json({ limit: "50mb" }));
app.use(bodyparser.urlencoded({ limit: "50mb", extended: true }));
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

// dotenv.config({ path: "./.env" });

// app.use(express.json());
// app.use(cookieParser());
// app.use(express.urlencoded({ extended: true }));
// app.use(cors());
// app.use(dotenv());

// connectDB();

// using Routers
// app.use("/",userRouter);
app.use("/api/v1/user/", userRouter);
app.use("/api/v1/feedback/", feedbackRoutes);
app.use("/api/v1/donate/", DonationRoutes);
app.use("/api/v1/job/", JobRoutes);
app.use("/api/v1/alumni/", AlumniRoutes);
app.use("/api/v1/student/", StudentRoutes);
app.use("/api/v1/event/", eventRoutes);
