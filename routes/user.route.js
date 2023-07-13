const express = require("express");
const User = require("../models/user.model");
const userRoute = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
userRoute.post("/signup", async (req, res) => {
  const { email, password } = req.body;
  try {
    const ifUserExists = await User.findOne({ email });
    console.log(ifUserExists);
    if (ifUserExists)
      return res.status(400).json({ msg: "user already registered" });
    else {
      const hash = bcrypt.hashSync(password, 8);
      const newUser = new User({ email, password: hash });
      await newUser.save();
      res
        .status(201)
        .json({ msg: "registeration successfully! Login Now", newUser });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});
userRoute.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(400).json({ msg: "user doesn't exists" });
  const result = await bcrypt.compare(password, user.password);
  if (result) {
    jwt.sign(
      { userId: user._id, email: user.email },
      process.env.SECRET_KEY,
      {
        expiresIn: "7d",
      },
      (err, token) => {
        if (err) throw err;
        res.status(200).json({ msg: "Login Successfull!", user, token });
      }
    );
  } else {
    res.status(400).json({ msg: "wrong email or password" });
  }
});
module.exports = userRoute;
