import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors({
  origin: ['http://localhost:5173','https://694b93cf622bb9ee950b2284--charming-sfogliatella-c05b17.netlify.app/' ],// Allow your Vite frontend
  methods: ['GET', 'POST', 'PATCH', 'DELETE','PUT'],
  credentials: true
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.options("*", cors());
import loanRoutes from "./Routes/loan.routes.js";
import adminRoutes from "./Routes/admin.routes.js";

// Mount the routes
app.use("/api/v1/loans", loanRoutes);   // Handles all LAMF business
app.use("/api/v1/admin", adminRoutes);  // Handles all Admin Auth
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
      console.log("✅ Module 1: Loan Products seeded successfully!");
    }
  } catch (error) {
    console.error("❌ Error seeding products:", error);
  }
};
export { app };