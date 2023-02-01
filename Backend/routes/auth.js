const express = require("express");
const router = express.Router();
const User = require("../models/User");
const { body, validationResult } = require("express-validator");
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "Sarthakisagoodcoder";
const fetchuser = require('../middleware/fetchuser');


//  Create a user using POST "/api/auth/createuser"
router.post(
  "/createuser", [
    body("name", "Enter a valid name").isLength({ min: 3 }),
    body("password", "Password must be at least 4 characters").isLength({
      min:5}),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    //check whether the email exists already
    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        return res
          .status(400)
          .json({ error: "Sorry a user with this email already exists" });
      }

      const salt = await bcrypt.genSalt(10);
      secPass = await bcrypt.hash(req.body.password,salt);

      // Create a new user
      user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secPass
      });
     const data = {
      user:{ 
        id : user.id
      }
     }

     const authToken =  jwt.sign(data,JWT_SECRET);
      res.json({authToken});

    } catch (error) {
      console.log(error.message);
      res.status(500).send("Internal Server Error")
    }
  }
);


// Authenticate a user using POST "/api/auth/login"
router.post("/login", [
    body("password", "Password cannot be").exists(),
    body("email", "Enter a valid email").isEmail(),
  ], async (req, res) => {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {email , password} = req.body;
    try{
       let user = await User.findOne({email})
       if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"})
       }

       const passwordCompare = await bcrypt.compare(password , user.password);
       if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"})
       }

       const data = {
        user : {id : user.id}
       }
    

    const authToken = jwt.sign(data , JWT_SECRET);
    res.json({authToken});

      } catch (error){
      console.log(error.message);
      res.status(500).send("Internal Server Error ")
    }
  }
)

// Get loggedin User detail using POST "/api/auth/getuser"  Login Required
router.post("/getuser",fetchuser, async (req, res) => {

try {
    userId = req.user.id
  const user = await User.findById(userId).select("-password");
  res.send(user);
} catch (error) {
  
      res.status(500).send("Internal Server Error ")
}

})

module.exports = router;
