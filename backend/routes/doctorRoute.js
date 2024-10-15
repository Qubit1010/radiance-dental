import express from "express";
import {
  appointmentsDoctor,
  doctorList,
  loginDoctor,
  appointmentsComplete,
  appointmentsCancel,
  doctorDashboard,
  getDoctorProfile,
  updateDoctorProfile,
} from "../controllers/doctorControllers.js";
import authDoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorList);
doctorRouter.post("/login", loginDoctor);
doctorRouter.get("/appointments", authDoctor, appointmentsDoctor);
doctorRouter.post("/complete-appointment", authDoctor, appointmentsComplete);
doctorRouter.post("/cancel-appointment", authDoctor, appointmentsCancel);
doctorRouter.get("/dashboard", authDoctor, doctorDashboard);
doctorRouter.get("/profile", authDoctor, getDoctorProfile);
doctorRouter.post("/update-profile", authDoctor, updateDoctorProfile);

export default doctorRouter;
