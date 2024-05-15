const bcrypt = require("bcrypt");
const db = require("../db");
const xss = require("xss-clean");

const registerUser = async (req, res) => {
  const { name, surname, email, password } = req;

    const safeName = xss(name);
    const safeSurname = xss(surname);
    const safeEmail = xss(email);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! "+ safeEmail);

    const [existingUser] = await db.query(
      "SELECT * FROM user WHERE email = ?",
      [safeEmail]
    );
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! "+ existingUser);

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO user (name, surname, email, password) VALUES (?, ?, ?, ?)",
      [safeName, safeSurname, safeEmail, hashedPassword]
    );
    

    
    const [newUser] = await db.query("SELECT * FROM user WHERE email = ?", [
      safeEmail,
    ]);
    console.log("!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!User registered successfully");
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser[0] });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const safeEmail = xss(email);

    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [
      safeEmail,
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
    const safeEmail = xss(email);

    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [
      safeEmail,
    ]);
    const user = users[0];
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

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
