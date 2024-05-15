const bcrypt = require("bcrypt");
const db = require("../db");

const registerUser = async (req, res) => {
  const { name, surname, email, password } = req;

  const [existingUser] = await db.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);
  if (existingUser.length > 0) {
    return 401;
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  await db.query(
    "INSERT INTO user (name, surname, email, password) VALUES (?, ?, ?, ?)",
    [name, surname, email, hashedPassword]
  );

  const [newUser] = await db.query("SELECT * FROM user WHERE email = ?", [
    email,
  ]);

  return newUser[0];
};

const loginUser = async (req, res) => {
  const { email, password } = req;
  try {
    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [
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
      return 400;
    }
    return user;
    
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req;
  try {
    const [users] = await db.query("SELECT * FROM user WHERE email = ?", [
      email,
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
