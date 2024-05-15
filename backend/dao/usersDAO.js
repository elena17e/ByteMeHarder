const mongoose = require('mongoose');
const User = require('../models/User');

/*mongoose.connect('mongodb://localhost:27017/hardkodirano', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
});*/

const registerUser = async (req, res) => {
    /*const { name, surname, email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }
        // Create new user
        const newUser = new User({ name, surname, email, password });
        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }*/
};

const loginUser = async (req, res) => {
    /*const { email, password } = req.body;
    try {
        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
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
    }*/
};

const forgotPassword = async (req, res) => {
    /*const { email } = req.body;
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
    }*/
};

module.exports = {
    registerUser,
    loginUser,
    forgotPassword
};