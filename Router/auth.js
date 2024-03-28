const express = require("express");
const User = require("../Modal/user")
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "ayushisagoodboy";

//Route 1 : Create a user
router.post(
  "/signup",
  async (req, res) => {
    let success = false;
    const { name, email, password, cpassword } = req.body;
    try {

      if (!name || !email || !password || !cpassword) {
        return res.status(400).json({ success, msg: "plz filled all the data" });
      }
      let user = await User.findOne({ email: email });
      if (user) {
        return res.status(201).json({ success, msg: "Email is already taken" });
      }
      if (password === cpassword) {
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(password, salt);
  
        user = await User.create({
          name: name,
          email: email,
          password: secPass
        });
        success = true;
        res.status(200).json({ success, msg: "Registered Successfully" });
      } else {
        res.status(401).json({ success, msg: "password not matching" });
      }
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error");
    }
  }
);

//Route 2 : Login authentication
router.post("/login",
  async (req, res) => {

    const { email, password } = req.body;
    let success = false;
    if (!email || !password) {
      return res.status(401).json({ success, msg: "plz filled all the data" });
    }

    try {
      let user = await User.findOne({ email: email });
  
      if (!user) {
        success = false;
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        success = false;
        return res.status(400).json({ error: "Invalid credentials" });
      }
  
   const data = { id: user._id  };
   console.log(data);
      const authtoken = jwt.sign(data, JWT_SECRET);  
      success = true;
      res.status(200).json({ success,  authtoken,  msg: "Login Successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).send("Internal Server Error");
    }
  
  }
);

module.exports = router; 