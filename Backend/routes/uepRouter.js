import express from "express";
import {
  deleteUep,
  getAllUeps,
  postUep,
  getBidangBantuan,
} from "../controllers/uepController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, postUep);
router.delete("/delete/:id", isAuthenticated, deleteUep);
router.get("/getall-uep", getAllUeps);
router.get("/bidang-bantuan-uep", getBidangBantuan);

export default router;