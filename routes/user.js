const express = require('express');
const router = express.Router(); 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/user.model");  
const { JWT_SECRET } = require('../config/keys'); 
 
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

router.post("/register", (req, res) => {  
  const { errors, isValid } = validateRegisterInput(req.body);    
  if (!isValid) {    
    return res.status(400).json(errors);      
  } 
 User.findOne({ email: req.body.email }).then(user => {  
    if (user) {  
      return res.status(400).json({ email: "Email already exists" });
    } else {     
      const newUser = new User({        
        email: req.body.email,     
        emailConfirm: req.body.emailConfirm,     
        password: req.body.password,  
        role: req.body.role,        
      }); 

      bcrypt.genSalt(10, (err, salt) => { 
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;  
          newUser.password = hash; 
          newUser   
            .save()          
            .then(user => {   
              res.json(user)})   
            .catch(err => console.log(err));  
        });  
      });
    } 
  }); 
});

router.post("/login", (req, res) => {
    const { errors, isValid } = validateLoginInput(req.body);
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const email = req.body.email;
    const password = req.body.password;
    
    User.findOne({ email }) 
      .then(user => {
      if (!user) {
        return res.status(404).json({ emailnotfound: "Email not found" });
      }
      bcrypt.compare(password, user.password).then(isMatch => {
        if (isMatch) {
          const payload = {
            _id: user._id,
            email: user.email, 
          };
          const token = jwt.sign(   
            payload,
            JWT_SECRET,     
            { expiresIn: 315569261 },                    
          )
           res.json({token, user:{payload}, message: "Login was successful"}) 
        } else { 
          return res.status(400)  
            .json({ error:"Invalid Email or password" });
        } 
      }); 
    });    
  }); 

  router.delete('/:id', async(req, res, next) => {
      await User.findById({_id: req.params.id})
      .then(user => user.remove())
      .then((user) => res.status(200).json({
        message: "User deleted successfully", user
      }))
      .catch(err => res.status(400).json(err));
  });

  router.get('/', async (req, res) => {
    await User.find()
    .sort ({userDate: -1})
    .select("email password emailConfirm role") 
    .then(user=>res.json(user))  
    .catch(err => res.status(400).json('Error: ' + err)); 
  }); 

  module.exports = router;