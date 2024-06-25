const mongoose = require('mongoose');
const Listings = require('../Models/Listings.js');
const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();
const app = express();
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'public')));

// storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/Uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

router.get('/', async (req, res) => {
    try {
        const listings = await Listings.find();
        res.status(200).json({ message: "all good", listings: listings });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "There was an error fetching the listings" });
    }
});

router.get('/:category', async (req, res) => {
    try {
        const categoryQ = req.params.category;
        console.log(`Category: ${categoryQ}`);
        const listings = await Listings.find({ category: categoryQ });
        if (listings.length > 0) {
            console.log(listings);
            res.status(200).json({ message: 'all good', listings: listings });
        } else {
            console.log("No listings found for the provided category");
            res.status(200).json({ message: "Not found", listings: [] });
        }
    } catch (error) {
        console.error("Error fetching listings by category:", error);
        res.status(500).json({ message: "There is something wrong" });
    }
});
//  passing response by id 
router.get("/id/:id",async(req,res)=>{
try {
    const id=req.params.id;
    console.log(id)
    const listings=await Listings.findById(id)
    res.status(200).json({message:'found',listings:listings})
    console.log(listings)
    
} catch (error) {
    console.log(error.message)
    res.status(400).json({message:"there is an error data not found"})
    
}
})
router.post('/createlistings', upload.array("listingPhotos"), async (req, res) => {
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

        const listingPhotos = req.files;
        if (!listingPhotos) {
            return res.status(400).send("No file uploaded.");
        }

        const listingPhotoPaths = listingPhotos.map((file) => file.path);
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
            listingPhotoPaths,
            title,
            description,
            highlight,
            highlightDesc,
            price,
        });

        await newListing.save();
        res.status(201).json(newListing);

    } catch (error) {
        console.error("There is something wrong:", error);
        res.status(500).json({ message: 'There is an error' });
    }
});

app.use('/api/listings', router);

module.exports = router;
