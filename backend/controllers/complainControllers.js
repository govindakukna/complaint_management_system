const db = require("../config/db.js");

const registerComplain = async (req, res) => {
  const { title, description, category } = req.body;
  //console.log("registering...");

  const query = `
    INSERT INTO complain (name,email, title, description, category, user_id) 
    VALUES ( ?,?,?, ?, ?, ?)
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(
        query,
        [
          req.user.name,
          req.user.email,
          title,
          description,
          category,
          req.user.id,
        ],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            resolve(results);
          }
        }
      );
    });

    res
      .status(201)
      .json({ message: "Complaint registered successfully", results });
  } catch (err) {
    res.status(500).json({ error: "Failed to register complaint" });
  }
};

const fetchComplains = async (req, res) => {
  const query = `
    SELECT 
      complain.title, 
      complain.description, 
      complain.category,
      complain.complain_date, 
      complain.status
    FROM 
      complain 
       WHERE 
      complain.user_id = ?
  `;

  try {
    const results = await new Promise((resolve, reject) => {
      db.query(query, [req.user.id], (err, results) => {
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

module.exports = { registerComplain, fetchComplains };
