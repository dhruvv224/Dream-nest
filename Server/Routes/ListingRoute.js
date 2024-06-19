const mongoose=require('mongoose');
const Listings=require('../Models/Listings.js');
const express=require('express');
const app=express();
const multer=require('multer')
const router=express.Router();
app.use(express.json());
// storage 
const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'/public/uploads')
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload=multer({storage})
router.get('/',async (req,res)=>{
    try {
        const ListingCategory=await Listings.find();
        res.status(200).json({ListingCategory})
        
    } catch (error) {
        
    }
})
router.post('/createlistings',upload.array("listingPhotos"),async(req,res)=>{
    try {
        const {
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
            title,
            description,
            highlight,
            highlightDesc,
            price,
          } = req.body;
        //  const listingPhotos=req.files
        //  if (!listingPhotos) {
        //     return res.status(400).send("No file uploaded.")
        //  }
        //  const listingPhotoPaths=listingPhotos.map((file)=>file.path)
         const newListing = new Listings({
            creator,
            category,
            type,
            streetAddress,
            aptSuite,
            city,
            province,
            country,
            guestCount,
            bedroomCount,
            bedCount,
            bathroomCount,
            amenities,
        
            title,
            description,
            highlight,
            highlightDesc,
            price,
          })
      
          await newListing.save()
          res.status(200).json(newListing)
        
    } catch (error) {
        
        console.log("There is something wrong ",error)
        res.status(400).json({message:'There is an error'})
    }
})
module.exports=router;