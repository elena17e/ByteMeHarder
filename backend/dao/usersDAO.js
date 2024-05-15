const User = require('../models/User');


const registerUser = async (req, res) => {
    const { name, surname, email, password } = req.body;
    try {
        const [existingUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
        if (existingUser.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        await db.query('INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)', [name, surname, email, password]);
       
        const [newUser] = await db.query('SELECT * FROM users WHERE email = ?', [email]);

        res.status(201).json({ message: 'User registered successfully', user: newUser[0] });
        } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
       
        const [users] = await db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password]);
        const user = users[0];
        if (!user) {
            return res.status(404).json({ message: 'User not found or invalid password' });
        }

        // Check password
        const isPasswordMatch = await user.comparePassword(password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }
        res.json({ message: 'Login successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

const forgotPassword = async (req, res) => {
    const { email } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Dummy logic to reset password
        user.password = 'newpassword'; // Change password to a random string or generate a password reset link
        await user.save();
        res.json({ message: 'Password reset successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword
};