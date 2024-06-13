const Users=require('../Models/User.js')
const express =require('express');
const app=express();
const router=express.Router()
const bcrypt = require("bcrypt");

router.get('/',async(req,res)=>{
    try {
        const User=await Users.find()
        res.status(200).json(User)
        
    } catch (error) {
        console.log(error)
        res.status(400).json({message:'There is something wrong'})
        
    }
})
router.post('/',async(req,res)=>{
    try {
        const { firstName, lastName, email, password } = req.body;
        const existingUser=await Users.findOne({email})
        if(existingUser)
            {
                console.log("user already exists login")
                res.status(409).json({message:'user exists'})
            }
        const saltRounds=10;
        const hashedPassword=await bcrypt.hash(password,saltRounds)
            const newUser = new Users({
                firstName,
                lastName,
                email,
                password:hashedPassword,
               
              });
          res.status(200).json({message:'Registered successfully',newUser})
              /* Save the new User */
              await newUser.save();
        
    } catch (err) {
        console.log(err);
    res
      .status(500)
      .json({ message: "Registration failed!", error: err.message });
  }
    
})
module.exports =router