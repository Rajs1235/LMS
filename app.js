import express from "express";

const app = express();

/**
 * 🔥 HARD CORS FIX (Preflight-safe)
 * This guarantees OPTIONS requests never fail on Render
 */
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://1films.netlify.app");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  res.header("Access-Control-Allow-Credentials", "true");

  // ✅ Handle preflight explicitly
  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  next();
});

// Body parsers
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));

// Routes
import loanRoutes from "./Routes/loan.routes.js";
import adminRoutes from "./Routes/admin.routes.js";

app.use("/api/v1/loans", loanRoutes);
app.use("/api/v1/admin", adminRoutes);

// Optional health check
app.get("/", (req, res) => {
  res.send("Backend is running");
});

// Product seeding (unchanged)
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
