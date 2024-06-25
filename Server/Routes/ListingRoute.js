const express = require('express');
const router = express.Router();
const Listings = require('../Models/Listings');

// Fetch all listings
router.get('/', async (req, res) => {
    try {
        const listings = await Listings.find();
        res.status(200).json({ message: "Success", listings: listings });
    } catch (error) {
        console.error("Error fetching listings:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch listings by category
router.get('/category/:category', async (req, res) => {
    const categoryQ = req.params.category;
    try {
        const listings = await Listings.find({ category: categoryQ });
        if (listings.length > 0) {
            res.status(200).json({ message: 'Success', listings: listings });
        } else {
            res.status(404).json({ message: "No listings found for the provided category" });
        }
    } catch (error) {
        console.error("Error fetching listings by category:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

// Fetch listing by ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const listing = await Listings.findById(id);
        if (listing) {
            res.status(200).json({ message: 'Success', listing: listing });
        } else {
            res.status(404).json({ message: "Listing not found" });
        }
    } catch (error) {
        console.error("Error fetching listing by ID:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});

module.exports = router;
