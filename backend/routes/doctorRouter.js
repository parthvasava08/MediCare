import express from "express";

import {
  createDoctor,
  getDoctors,
  getDoctorById,
  updateDoctor,
  deleteDoctor,
  toggleAvailability,
  doctorLogin,
  logoutAllDevices,
  forgotPassword,
  resetPassword,
} from "../controllers/doctorController.js";

import doctorAuth from "../middlewares/doctorAuth.js";
import adminAuth from "../middlewares/adminAuth.js";

import upload from "../middlewares/multer.js";

const doctorRouter = express.Router();

doctorRouter.get("/", getDoctors);
doctorRouter.post("/login", doctorLogin);
doctorRouter.post("/forgot-password", forgotPassword);
doctorRouter.post("/reset-password", resetPassword);
doctorRouter.post("/logout-all", doctorAuth, logoutAllDevices);
doctorRouter.get("/:id", getDoctorById);
doctorRouter.post("/", adminAuth, upload.single("image"), createDoctor);
doctorRouter.put("/:id", doctorAuth, upload.single("image"), updateDoctor);
doctorRouter.post("/:id/toggle-availability", doctorAuth, toggleAvailability);
doctorRouter.delete("/:id", adminAuth, deleteDoctor);

export default doctorRouter;
