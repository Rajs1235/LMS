import { Router } from "express";
import { registerAdmin, loginAdmin, getProfile } from "../Controllers/admin.controller.js";
import { verifyAdmin } from "../middleware/Auth.middleware.js";

const router = Router();

// Public: Staff must be able to login to get a token
router.post("/login", loginAdmin);
router.post("/register", registerAdmin); // Can be restricted later

// Protected: Only logged-in staff can see their own profile
router.get("/profile", verifyAdmin, getProfile);

export default router;