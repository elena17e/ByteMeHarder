
const bcrypt = require("bcrypt");
const db = require('../db');


const registerUser = async (req, res) => {
  const { name, surname, email, password } = req.body;
  try {
    const [existingUser] = await db.query(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );
    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (name, surname, email, password) VALUES (?, ?, ?, ?)",
      [name, surname, email, hashedPassword]
    );

    const [newUser] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const loginUser = async (req, res) => {
  console.log(req);
  const { email, password } = req;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found or invalid credentials" });
    }

    
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user: user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const [users] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);
    const user = users[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // ADD SEND VERIFICATION EMAIL AND RESET PASSWORD FUNCTIONALITY HERE

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  registerUser,
  loginUser,
  forgotPassword,
};

