import express from "express";
import adminAuth from "../middlewares/adminAuth.js";

import {
  getServiceAppointments,
  getServiceAppointmentById,
  createServiceAppointment,
  confirmServicePayment,
  updateServiceAppointment,
  cancelServiceAppointment,
  getServiceAppointmentStats,
  getServiceAppointmentsByPatient,
} from "../controllers/serviceAppointmentController.js";

const router = express.Router();

router.get("/", adminAuth, getServiceAppointments);
router.get("/confirm", confirmServicePayment);
router.get("/stats/summary", adminAuth, getServiceAppointmentStats);

router.post("/", createServiceAppointment);

router.get("/me", getServiceAppointmentsByPatient);

router.get("/:id", adminAuth, getServiceAppointmentById);
router.put("/:id", adminAuth, updateServiceAppointment);
router.post("/:id/cancel", adminAuth, cancelServiceAppointment);

export default router;
