const express = require('express');
const router = express.Router();
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Complaint = require('./models/Complaint')
const authmiddleware = require('./middleware/authmiddleware')

router.post( '/login',async (req, res) => {
    const { name, password } = req.body;
  
    if (!name || !password) {
      return res.status(422).json({ error: "Please provide a valid username and password" });
    }
  
    try {
      const user = await User.findOne({ name });
  
      if (!user) {
        return res.status(422).json({ error: "Invalid username or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const secretKey = process.env.JWT_SECRET_KEY || 'yourDefaultSecretKey';
        const token = jwt.sign({ _id: user.id }, secretKey);
  
        return res.status(200).json({
          message: "Login successful",
          token,
        });
      } else {
        return res.status(404).json({ error: "Invalid Credentials!!!" });
      }
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });
  

  router.post('/register' , async (req, res) => {
    const { name, email, password } = req.body;
  
    if (!name || !email || !password) {
      console.log('Please add all the fields');
      return res.status(422).json({ error: "Please add all the fields" });
    }
  
    try {
      const existingUser = await User.findOne({  name  });
  
      if (existingUser) {
        console.log('User already exists! with that username or email');
        return res.status(422).json({ error: "User already exists! with that username or email" });
      }
  
      const hashedPassword = await bcrypt.hash(password, 12);
      const user = new User({
        name,
        email,
        password: hashedPassword
      });
  
      user.save().then(async user => {
        return res.json({
          message: "Registered Successfully",
          token: await user.generateToken(),
          userId: user._id.toString(),
        });
      })
        .catch(err => {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });


  router.post('/postComplaint' , async (req, res) => {
    const { address, image, title, desc } = req.body;
    if (!address || !title || !desc) {
      console.log('Please add all the fields');
      return res.status(422).json({ error: "Please add all the fields" });
    }
  
    try {
      const complaint = new Complaint({
        address,
        image,
        title,
        desc
      });
  
      complaint.save().then(async user => {
        return res.json({
          message: "Complaint Sent Successfully",
        });
      })

        .catch(err => {
          console.log(err);
          return res.status(500).json({ error: "Internal server error" });
        });
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: "Internal server error" });
    }
  });


  router.get('/user', authmiddleware, (req, res) => {
    try {
        const userData = req.User;
        console.log(userData);
        res.status(200).json({ msg: userData })
    } catch (error) {
        console.log(error)
    }
    })



  module.exports = router;