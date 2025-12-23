import mongoose from 'mongoose';

const applicationSchema = new mongoose.Schema({
   applicantName: { type: String, required: true },  
   email: { type: String, required: true },
    loanAmount: { type: Number, required: true },
    status: { 
        type: String, 
        // ADD "Hold" TO THIS LIST
        enum: ["Pending", "Approved", "Ongoing", "Completed", "Rejected", "Hold"], 
        default: "Pending" 
    },
  
    product: { 
        type: mongoose.Schema.Types.ObjectId,
         ref: "Product" },
         isKYCVerified: { type: Boolean, default: false },
    collateral: [{
        fundName: String,
        isin: String,
        units: Number,
        currentNav: Number
    }]
}, { timestamps: true });

export const Application = mongoose.model("Application", applicationSchema);