const jwt = require("jsonwebtoken");
const db = require("../config/db");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // console.log(decoded.id);

      db.query(
        "SELECT id, name, email,isAdmin FROM registration WHERE id = ?",
        [decoded.id],
        (err, results) => {
          if (err) {
            res.status(500).json({ Error: "Database query failed" });
            return;
          }

          if (results.length === 0) {
            res.status(401).json({ Error: "Not authorized, user not found" });
            return;
          }

          req.user = results[0];
    //  console.log(req.user);
          next();
        }
      );
    } catch (err) {
      res.status(401).json({ Error: "Not authorized, token failed" });
    }
  } else {
    res.status(401).json({ Error: "Not authorized, token failed" });
  }
};

module.exports = protect;
