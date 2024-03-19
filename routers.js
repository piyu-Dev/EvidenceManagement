const express = require('express');
const router = express.Router();
const User = require('./models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const Complaint = require('./models/Complaint')
const authmiddleware = require('./middleware/authmiddleware')
const crypto = require('crypto');


router.post( '/login',async (req, res) => {
    const { email, password } = req.body;
  
    if (!email || !password) {
      return res.status(422).json({ error: "Please provide a valid username and password" });
    }
  
    try {
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(422).json({ error: "Invalid username or password" });
      }
  
      const isMatch = await bcrypt.compare(password, user.password);
  
      if (isMatch) {
        const secretKey = process.env.JWT_SECRET_KEY;
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


  // router.post('/postComplaint' , async (req, res) => {
  //   const { address, image, title, desc } = req.body;
  //   if (!address || !title || !desc) {
  //     console.log('Please add all the fields');
  //     return res.status(422).json({ error: "Please add all the fields" });
  //   }
  
  //   try {
  //     const complaint = new Complaint({
  //       address,
  //       image,
  //       title,
  //       desc
  //     });
  
  //     complaint.save().then(async user => {
  //       return res.json({
  //         message: "Complaint Sent Successfully",
  //       });
  //     })

  //       .catch(err => {
  //         console.log(err);
  //         return res.status(500).json({ error: "Internal server error" });
  //       });
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(500).json({ error: "Internal server error" });
  //   }
  // });



function encrypt(text) {
  const algorithm = 'aes-256-cbc';
  const key = crypto.randomBytes(32); 
  const iv = crypto.randomBytes(16); 
  const cipher = crypto.createCipheriv(algorithm, Buffer.from(key), iv);
  let encrypted = cipher.update(text);
  encrypted = Buffer.concat([encrypted, cipher.final()]);
  return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex'), key: key.toString('hex') };
}


function decrypt(encryptedData, iv, key) {
  const algorithm = 'aes-256-cbc';
  const decipher = crypto.createDecipheriv(algorithm, Buffer.from(key, 'hex'), Buffer.from(iv, 'hex'));
  let decrypted = decipher.update(Buffer.from(encryptedData, 'hex'));
  decrypted = Buffer.concat([decrypted, decipher.final()]);
  return decrypted.toString();
}


router.post('/postComplaint/:add', async (req, res) => {
  const {add} = req.params;
  const { address, image, title, desc } = req.body;
  if (!address || !title || !desc) {
    console.log('Please add all the fields');
    return res.status(422).json({ error: "Please add all the fields" });
  }

  try {
    const encryptedTitle = encrypt(title);
    const encryptedDesc = encrypt(desc);
    const encryptedAdd = encrypt(address);
    const encryptedImage = encrypt(image);
    const complaint = new Complaint({
      walletAdd:add,
      address:encryptedAdd,
      image:encryptedImage,
      title: encryptedTitle,
      desc: encryptedDesc
    });

    complaint.save().then(async user => {
      return res.json({
        message: "Complaint Sent Successfully",
        data:complaint
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


router.get('/complaint/:id', async (req, res) => {
  const complaintId = req.params.id;

  try {
    const complaint = await Complaint.findById(complaintId);
    if (!complaint) {
      return res.status(404).json({ error: "Complaint not found" });
    }

    const decryptedTitle = decrypt(complaint.title.encryptedData, complaint.title.iv, complaint.title.key);
    const decryptedImage = decrypt(complaint.image.encryptedData, complaint.image.iv, complaint.image.key);
    const decryptedDesc = decrypt(complaint.desc.encryptedData, complaint.desc.iv, complaint.desc.key);
    const decryptedAddress = decrypt(complaint.address.encryptedData, complaint.address.iv, complaint.address.key);
    const wadd = complaint.walletAdd;

    return res.status(200).json({
      walletAdd: wadd,
      title: decryptedTitle,
      image:decryptedImage,
      desc: decryptedDesc,
      address: decryptedAddress,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ error: "Internal server error" });
  }
});



router.get('/complaints', async (req, res) => {
  try {
    const complaints = await Complaint.find();

    const decryptedComplaints = complaints.map(complaint => {
      return {
        address: decrypt(complaint.address.encryptedData, complaint.address.iv, complaint.address.key),
        image: decrypt(complaint.image.encryptedData, complaint.image.iv, complaint.image.key),
        title: decrypt(complaint.title.encryptedData, complaint.title.iv, complaint.title.key),
        desc: decrypt(complaint.desc.encryptedData, complaint.desc.iv, complaint.desc.key),
      };
    });

    res.status(200).json(decryptedComplaints);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});



router.get('/user', authmiddleware(), (req, res) => {
    try {
        const userData = req.user; 
        console.log(userData);
        res.status(200).json({ msg: userData });
    } catch (error) {
        console.log(error);
    }
});



  module.exports = router;