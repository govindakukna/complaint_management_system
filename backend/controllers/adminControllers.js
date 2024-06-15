const db = require("../config/db");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const generateToken = require("../config/generateToken");

const loginAdmin = async (req, res) => {
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
        return res.status(400).json({ error: "You are not An Admin" });
      }

      const user = results[0];
     // console.log(user);

      // Check if the user is an admin
      if (!user.isAdmin) {
        return res.status(403).json({ error: "Access denied: not an admin" });
      }

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
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        },
        token: token,
      });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const fetchAllComplains = async (req, res) => {
  const isAdmin = req.user.isAdmin; // Assuming `isAdmin` is a boolean field in the user object

  let query = `
    SELECT 
      complain.id,
      complain.title, 
      complain.description, 
      complain.category, 
      complain.status,
      complain.complain_date,
      registration.name AS user_name
    FROM 
      complain
    LEFT JOIN
      registration ON complain.user_id = registration.id
  `;

  if (!isAdmin) {
    res.status(500).json({ error: "you are not an admin" });
  }

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, isAdmin ? [] : [req.user.id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });
  // console.log(results);
    res.status(200).json(results);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch complaints" });
  }
};

const updateComplainStatus = async (req, res) => {
  const { id, status } = req.body;
  const isAdmin = req.user?.isAdmin;

  if (!isAdmin) {
    return res.status(403).json({ error: "Access denied" });
  }

  const updateQuery = `UPDATE complain SET status = ? WHERE id = ?`;
  const selectQuery = `SELECT status FROM complain WHERE id = ?`;

  try {
    // Update the complaint status
    await new Promise((resolve, reject) => {
      db.query(updateQuery, [status, id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results);
        }
      });
    });

    // Retrieve the updated status
    const updatedStatus = await new Promise((resolve, reject) => {
      db.query(selectQuery, [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          resolve(results[0].status); // Assuming results is an array and we need the status of the first item
        }
      });
    });

    res
      .status(200)
      .json({
        message: "Complaint status updated successfully",
        status: updatedStatus,
      });
  } catch (err) {
    console.error("Error updating complaint status:", err);
    res.status(500).json({ error: "Failed to update complaint status" });
  }
};


module.exports = { loginAdmin,fetchAllComplains, updateComplainStatus };
