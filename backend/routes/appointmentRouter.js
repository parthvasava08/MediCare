import express from "express";
import mongoose from "mongoose";
import adminAuth from "../middlewares/adminAuth.js";
import doctorAuth from "../middlewares/doctorAuth.js";

import {
  getAppointments,
  getAppointmentById,
  createAppointment,
  confirmPayment,
  updateAppointment,
  updateAppointmentStatusAdmin,
  cancelAppointment,
  getStats,
  getAppointmentsByPatient,
  getAppointmentsByDoctor,
  getRegisteredUserCount,
} from "../controllers/appointmentController.js";

const appointmentRouter = express.Router();

// Any route with an :id segment gets the id checked once, here, so a bad id
// returns a clean 400 instead of crashing inside Mongoose (CastError -> 500).
appointmentRouter.param("id", (req, res, next, id) => {
  if (!mongoose.isValidObjectId(id)) {
    return res.status(400).json({ success: false, message: "Invalid appointment id" });
  }
  next();
});

// ROUTE ORDER MATTERS: Express uses the first route that matches. Fixed paths
// ("/me", "/confirm") must be declared BEFORE the "/:id" wildcard below,
// otherwise "/me" is treated as an appointment id and "/confirm" (the Stripe
// payment confirmation call) is captured by the admin-only handler.
appointmentRouter.get("/", adminAuth, getAppointments);
appointmentRouter.get("/confirm", confirmPayment);
appointmentRouter.get("/me", getAppointmentsByPatient);
appointmentRouter.get("/stats/summary", adminAuth, getStats);
appointmentRouter.get("/patients/count", adminAuth, getRegisteredUserCount);
appointmentRouter.get("/doctor/:doctorId", doctorAuth, getAppointmentsByDoctor);
appointmentRouter.get("/:id", adminAuth, getAppointmentById); // wildcard LAST

appointmentRouter.post("/", createAppointment);
appointmentRouter.post("/:id/cancel", adminAuth, cancelAppointment);

// Admin-only status override - narrower than the doctor's PUT /:id below
// (status only, no reschedule/notes).
appointmentRouter.put("/:id/admin-status", adminAuth, updateAppointmentStatusAdmin);
appointmentRouter.put("/:id", doctorAuth, updateAppointment);

export default appointmentRouter;
