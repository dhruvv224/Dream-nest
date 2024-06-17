const mongoose=require('mongoose');
const Listings=require('../Models/Listings.js');
const express=require('express');
const app=express();
const multer=require('multer')
const router=express.Router();
app.use(express.json());
router.get('/',async (req,res)=>{
    try {
        const ListingCategory=await Listings.find();
        res.status(200).json({ListingCategory})
        
    } catch (error) {
        
    }
})
module.exports=router;