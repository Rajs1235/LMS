import { Admin } from '../Models/Admin.model.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

// Power 1: Register a new NBFC Admin
export const registerAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Check if admin already exists
        const exists = await Admin.findOne({ email });
        if (exists) return res.status(400).json({ message: "Admin already exists" });

        // Hash the password for security (Best Practice)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newAdmin = await Admin.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Power 2: Login and generate Session Token
export const loginAdmin = async (req, res) => {
    try {
        const { email, password } = req.body;

        const admin = await Admin.findOne({ email });
        if (!admin) return res.status(400).json({ message: "Admin not found" });

        // Check password
        const validPass = await bcrypt.compare(password, admin.password);
        if (!validPass) return res.status(400).json({ message: "Invalid credentials" });

        // Create JWT Token
        const token = jwt.sign(
            { id: admin._id, role: admin.role },
            process.env.JWT_SECRET || 'your_secret_key',
            { expiresIn: '1d' }
        );

        res.status(200).json({
            token,
            admin: { id: admin._id, name: admin.name, email: admin.email }
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Power 3: Fetch Profile Data for the Profile Page
export const getProfile = async (req, res) => {
    try {
        const admin = await Admin.findById(req.admin.id).select("-password");
        res.status(200).json(admin);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};