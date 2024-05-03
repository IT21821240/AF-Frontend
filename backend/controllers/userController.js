const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { isValidEmail, isValidPassword } = require('../utils/commonFunctions');

const createUser = async (req, res) => {
    try {
        const { fullName, email, password } = req.body;
        
        if (!fullName || fullName.trim() === "") {
            return res.status(400).json({ success: false, error: "Name is required" });
        }

        if (!email || !isValidEmail(email)) {
            return res.status(400).json({ success: false, error: "Email should be in basic email format" });
        }

        if (!password || isValidPassword(password)) {
            return res.status(400).json({ success: false, error: "Password Should contain at least 10 characters, including at least one uppercase letter, one lowercase letter, one number, and one special character" });
        }

        // Check if admin already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {    
            return res.status(409).json({
                success: false,
                message: "User already exists",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({
            fullName,
            email,
            password: hashedPassword,
        });

        if (user) {
            return res.status(201).json({ success: true, message: "New User created", data: user });
        } else {
            console.error("Error creating user: User data not valid");
            return res.status(400).json({ success: false, error: "User data not valid" });
        }
    } catch (error) {
        console.error("Error creating user:", error.message);
        return res.status(500).json({
            success: false,
            error: error.message,
            message: "Error while registering as User",
        });
    }
};

async function login(req, res) {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({ message: 'Email and password are required' });
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Compare passwords
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
            {
                user: {
                    fullName: user.fullName,
                    email: user.email,
                    id: user.id,
                },
            },
            process.env.JWT_SECRET,
            { expiresIn: '1h' } 
        );

        // Log successful login
        console.log("User logged in successfully:", { userId: user.id });

        // Return token and user information
        return res.json({ token, user: { fullName: user.fullName, email: user.email } });
    } catch (error) {
        // Handle specific error types
        console.error("Internal server error during login attempt:", { error });

        // Handle specific error types
        if (error instanceof mongoose.Error) {
            return res.status(500).json({ message: 'Database error' });
        }

        // Generic error response
        return res.status(500).json({ message: 'Internal server error' });
    }
};


module.exports = { createUser, login };
