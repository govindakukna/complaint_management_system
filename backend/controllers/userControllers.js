const generateToken = require("../config/generateToken");
const db = require("../config/db.js");
const bcrypt = require("bcrypt");

const registerUser = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ error: "Please enter all the fields" });
  }

  try {
    // Check if the user already exists
    const userExistsQuery = "SELECT * FROM registration WHERE email = ?";
    db.query(userExistsQuery, [email], async (err, results) => {
      if (err) {
        console.error("Error checking user existence:", err);
        return res.status(500).send("Internal server error");
      }

      if (results.length > 0) {
        return res.status(400).json({ message: "User already exists" });
      }

      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Save user to the database
      const insertUserQuery =
        "INSERT INTO registration (name, email, password) VALUES (?, ?, ?)";
      db.query(
        insertUserQuery,
        [name, email, hashedPassword],
        (err, result) => {
          if (err) {
            console.error("Error saving user:", err);
            return res.status(500).send("Internal server error");
          }

          // Generate JWT
          const token = generateToken(result.insertId);

          if (!token) {
            return res.status(400).json({ error: "Token not created" });
          }

          res.status(201).json({
            message: "User registered successfully",

            token: token,
          });
        }
      );
    });
  } catch (error) {
    console.error("Error during registration:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Please enter all the fields" });
  }

  try {
    // Fetch user from the database
    const sql = "SELECT * FROM registration WHERE email = ?";
    db.query(sql, [email], async (err, results) => {
      if (err) {
        console.error("Error fetching user:", err);
        return res.status(500).json({ error: "Internal server error" });
      }

      if (results.length === 0) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      const user = results[0];

      // Compare the password with the stored hash
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res.status(400).json({ error: "Invalid email or password" });
      }

      // Generate JWT
      const token = generateToken(user.id);

      if (!token) {
        return res.status(500).json({ error: "Token not created" });
      }

      res.status(200).json({
        message: "Login successful",
        user: { id: user.id, name: user.name, email: user.email },
        token: token,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
