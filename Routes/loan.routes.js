import { Router } from "express";
import { 
    createApplication, 
    getApplications, 
    updateLoanStatus, 
    getAllProducts,
    createProduct // Optional: if you have this controller
} from "../Controllers/loan.controller.js";
import { verifyAdmin } from "../middleware/Auth.middleware.js";

const router = Router();

// --- PUBLIC ROUTES (No Token Needed) ---
// Module 1: Fintechs and Frontend need to see products to fill the form
router.get("/product", getAllProducts); 

// Module 3: External API for Fintech Partners to submit loans
router.post("/apply", createApplication); 


// --- PROTECTED NBFC STAFF MODULES ---
// Every route defined below this middleware requires a valid JWT Token
 

// Module 2 & 4: View all applications and filter ongoing loans
router.get("/list", getApplications); 

// Module 5: Admin Power to approve/reject/hold loans
router.patch("/update-status/:id", updateLoanStatus); 

// Admin only: Capability to add new loan products
router.post("/product", createProduct); 

export default router;