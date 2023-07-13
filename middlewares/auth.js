const jwt = require("jsonwebtoken");

const Auth = async (req, res, next) => {
  const token = req.headers?.authorization.split(" ")[1];
  try {
    if (token) {
      jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
        if (err) throw err;
        (req.id = user.id), (req.email = user.email);
      });
      next();
    } else {
      res.status(400).json({ msg: "restricted route please provide token" });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};
module.exports = Auth;
