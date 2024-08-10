const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const fetchuser = require('../middleware/fetchuser')

//secret for jwt token
require('dotenv').config(); 
const JWT_SECRET = process.env.JWT_SECRET

//ROUTE 1: create a User: POST "/api/auth/createUser". No login require 
router.post("/createUser", [
    body("name", "Name should contain atleat 3 letters").isLength({ min: 3 }),
    body("email", "Enter valid email").isEmail(),
    body("password", "Password should contain atleast 6 letters").isLength({ min: 6 }),
  ],
  async(req, res) => {
    // console.log(req.body);
    // let user = User(req.body)
    // user.save()
    let success = false
    const result = validationResult(req);
    if (!result.isEmpty()) {
      return res.status(400).json({ errors: result.array() });
    }
    
    try {
        let user = await User.findOne({email: req.body.email})
        if (user) {
            return res.status(400).json({success, error: "Sorry a user with this email already existed!"})
        }
    
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: hash
        })

        //To sign token           
        const data = {
          user:{
            id: user.id
          }
        }
        var authToken = jwt.sign(data , JWT_SECRET);
      
        console.log(authToken);
        // If we use promise then use .then
        // .then(user => res.json(user))
        // .catch(err => {console.log(err)
        // res.json({error: "Please Enter A Unique Value", message: err.message })})
        success = true
        res.json({success, authtoken: authToken, user: { name: user.name, email: user.email}})   
    } 
    
    catch (error) {
        console.error(error.message)
        res.status(400).send("Some error occur")
    }
  }
);


// ROUTE 2: Authenticate a User using: POST "/api/auth/login" . No login required   
router.post('/login', [
    body("email", "Enter valid email").isEmail(),
    body("password", "Password cannot be emty").exists(),
  ], async(req, res) => {

  const result = validationResult(req);
  if (!result.isEmpty()) {
    return res.status(400).json({ errors: result.array() });
  }

  let success = false

  const {email, password} = req.body
  try {
    let user = await User.findOne({email})
    if (!user) {
      return res.status(400).json({error: "Please try to login with current credentials"})
    }

    // Check if the hash of password match or not
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (!passwordCompare) {
      return res.status(400).json({success, error: "Please try to login with current credentials"})
    }

    //give jwt token
    const data = {
      user:{
        id: user.id
      }
    }
    success = true
    var authToken = jwt.sign(data , JWT_SECRET);
    res.json({success, authtoken: authToken});

  } catch (error) {
    console.error(error.message)
    res.status(400).send("Internal server error")
  }
})


//ROUTE 3: 
router.post('/getuser', fetchuser, async(req, res) => {
  try {
    const userId = "todo"
    const data = await User.findById(userId).select("-password")
  } catch (error) {
    console.error(error.message)
    res.status(400).send("Internal server error")
  }
})
module.exports = router;
