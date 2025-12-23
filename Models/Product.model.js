import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
    {
        name:
        {
            type: String,
            required: true
        },
        maxLTV:
        {
            type: Number,
            required: true
        }, // Loan-to-Value percentage (e.g., 50 for 50%)
        interestRate:
        {
            type: Number,
            required: true
        },
        description: String
    },
    { timestamps: true }
);

export const Product = mongoose.model("Product", productSchema);