import { Application } from "../Models/Application.model.js";
import { Product } from "../Models/Product.model.js";
import nodemailer from "nodemailer";

/**
 * Helper for sending emails
 * Wrapped in a safety check to ensure it doesn't crash the main thread
 */
const sendStatusEmail = async (userEmail, name, status) => {
  console.log("DEBUG: Attempting to send email to:", userEmail);

  // 🛑 FINAL SAFETY GUARD (CRITICAL)
  if (!userEmail) {
    console.warn("EMAIL SKIPPED: No email found for applicant:", name);
    return;
  }

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  await transporter.verify();
  console.log("SMTP CONNECTION OK");

  try {
    const info = await transporter.sendMail({
      from: `"1Fi LMS" <${process.env.EMAIL_USER}>`,
      to: userEmail,
      subject: `Loan Application ${status}`,
    html: `
<div style="font-family: Arial, sans-serif; color: #1f2937;">
  <h2 style="color:#4f46e5;">Loan Application Status Update</h2>

  <p>Dear <strong>${name}</strong>,</p>

  <p>
    We hope this message finds you well.
    <br /><br />
    This is to inform you that the status of your loan application has been updated.
  </p>

  <p style="font-size:16px;">
    <strong>Current Status:</strong>
    <span style="color:#4f46e5;">${status}</span>
  </p>

  <p>
    Our team has reviewed your application. If any further action is required,
    we will reach out to you.
  </p>

  <p>
    Thank you for choosing <strong>1Fi LMS</strong>.
  </p>

  <p style="margin-top:30px;">
    Warm regards,<br />
    <strong>1Fi LMS Team</strong>
  </p>

  <hr />
  <p style="font-size:12px;color:#6b7280;">
    This is an automated notification. Please do not reply to this email.
  </p>
</div>
`

    });

    console.log("DEBUG: Email sent successfully!", info.messageId);
  } catch (error) {
    console.error("DEBUG: SMTP ERROR:", error.message);
  }
};

/**
 * Module 3: External API for Fintech Partners
 */
export const createApplication = async (req, res) => {
  console.log("REQ BODY EMAIL:", req.body.email);

  try {
    const { applicantName, email, loanAmount, productId, collateral } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    if (!Array.isArray(collateral) || collateral.length === 0) {
      return res.status(400).json({ message: "Collateral is required" });
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Loan product not found" });
    }

    const totalCollateralValue = collateral.reduce(
      (acc, item) => acc + Number(item.units) * Number(item.currentNav),
      0
    );

    const eligibleLimit = totalCollateralValue * (product.maxLTV / 100);
    if (loanAmount > eligibleLimit) {
      return res.status(400).json({
        message: `Loan amount exceeds eligible LTV. Max eligible: ₹${eligibleLimit.toFixed(2)}`
      });
    }

    const newApp = await Application.create({
      applicantName,
      email,
      loanAmount,
      product: productId,
      collateral,
      status: "Pending",
      isKYCVerified: false
    });

    console.log("DEBUG: Saved Email =>", newApp.email);

    res.status(201).json(newApp);
  } catch (error) {
    console.error("CREATE APP ERROR:", error);
    res.status(500).json({ message: error.message });
  }
};

/**
 * Module 2 & 4: Admin Application List
 */
export const getApplications = async (req, res) => {
  try {
    const apps = await Application.find().populate("product");
    res.status(200).json(apps);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Module 1: Product Management
 */
export const createProduct = async (req, res) => {
  try {
    const { name, maxLTV, interestRate, description } = req.body;
    const product = await Product.create({
      name,
      maxLTV,
      interestRate,
      description
    });
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Module 1: Public Product API
 */
export const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

/**
 * Module 5: Administrative Powers (Status Transitions)
 * Handles KYC verification and Final Approval with automated email notification
 */
export const updateLoanStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    const updatedLoan = await Application.findByIdAndUpdate(
      id,
      { $set: updateData },
      { new: true }
    );

    if (!updatedLoan) {
      return res.status(404).json({ message: "Loan application not found" });
    }

    if (updateData.status) {
      sendStatusEmail(
        updatedLoan.email,
        updatedLoan.applicantName,
        updateData.status
      ).catch(err =>
        console.error("Post-update email failure:", err)
      );
    }

    res.status(200).json(updatedLoan);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
