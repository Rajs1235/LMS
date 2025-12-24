import express from "express";
import cors from "cors";

const app = express();

/**
 * ✅ FINAL CORS CONFIG (Render + Vercel safe)
 */
const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://lms-frontend-bm49.vercel.app"
  ],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

// Apply CORS to all requests
app.use(cors(corsOptions));

// ✅ HARD FIX: Handle preflight explicitly (Node 22 safe)
app.use((req, res, next) => {
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }
  next();
});

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
import loanRoutes from "./Routes/loan.routes.js";
import adminRoutes from "./Routes/admin.routes.js";

app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes);

// Health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Product seeding
import { Product } from "./Models/Product.model.js";

const initialProducts = [
  {
    name: "Equity Mutual Fund Loan",
    maxLTV: 50,
    interestRate: 10.5,
    description: "Standard loan against equity-oriented mutual funds."
  },
  {
    name: "Debt Mutual Fund Loan",
    maxLTV: 80,
    interestRate: 8.5,
    description: "Low-risk loan against debt-oriented mutual funds."
  },
  {
    name: "Hybrid Mutual Fund Loan",
    maxLTV: 65,
    interestRate: 9.5,
    description: "Balanced loan against hybrid/conservative funds."
  }
];

export const seedProducts = async () => {
  try {
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(initialProducts);
      console.log("✅ Loan Products seeded successfully!");
    }
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }
};

export { app };
