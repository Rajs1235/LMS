import mongoose from "mongoose";
import { Product } from "../Models/Product.model.js";

const connectDB = async () => {
    try {
        // Connect to MongoDB using the URI from your .env file
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/lms`);
        console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
        
        // --- MODULE 1: LOAN PRODUCTS SEEDING ---
        const count = await Product.countDocuments();
        
        // If no products exist, seed the 8 standard LAMF products
        if (count === 0) {
            console.log("Seeding 8 default 1Fi loan products...");
            await Product.insertMany([
                { name: "Standard Equity Loan", maxLTV: 50, interestRate: 10.5, description: "Standard lending against equity funds" },
                { name: "Priority Equity Loan", maxLTV: 55, interestRate: 11.5, description: "Higher LTV for priority equity funds" },
                { name: "Standard Debt Loan", maxLTV: 80, interestRate: 8.5, description: "Lending against low-risk debt funds" },
                { name: "Debt Plus Loan", maxLTV: 85, interestRate: 9.0, description: "Maximum LTV for liquid and debt funds" },
                { name: "Hybrid Flexi Loan", maxLTV: 60, interestRate: 9.5, description: "Lending against hybrid/balanced funds" },
                { name: "Instant Liquid Fund Loan", maxLTV: 90, interestRate: 7.5, description: "Instant approval for liquid fund collateral" },
                { name: "Bluechip Specific Loan", maxLTV: 50, interestRate: 10.0, description: "Special rates for bluechip equity funds" },
                { name: "ELSS Tax-Saver Loan", maxLTV: 45, interestRate: 12.0, description: "Lending against locked-in tax saver funds" }
            ]);
            console.log("✅ 8 Loan Products seeded successfully for Module 1!");
        }
        
    } catch (error) {
        console.log("MONGODB connection FAILED ", error);
        process.exit(1);
    }
};

export default connectDB;