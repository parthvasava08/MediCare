import express from "express";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "../controllers/serviceController.js";

import adminAuth from "../middlewares/adminAuth.js";

import upload from "../middlewares/multer.js";

const serviceRouter = express.Router();

serviceRouter.get("/", getServices);
serviceRouter.get("/:id", getServiceById);

serviceRouter.post("/", adminAuth, upload.single("image"), createService);

serviceRouter.put("/:id", adminAuth, upload.single("image"), updateService);

serviceRouter.delete("/:id", adminAuth, deleteService);

export default serviceRouter;
