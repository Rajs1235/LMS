import jwt from 'jsonwebtoken';

export const verifyAdmin = (req, res, next) => {
    // Get token from header (Format: Bearer <token>)
    const token = req.headers.authorization?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Access Denied: No Token Provided" });
    }

    try {
        const verified = jwt.verify(token, process.env.JWT_SECRET || 'your_secret_key');
        req.admin = verified;
        next(); // Move to the next function (the controller)
    } catch (err) {
        res.status(400).json({ message: "Invalid Token" });
    }
};