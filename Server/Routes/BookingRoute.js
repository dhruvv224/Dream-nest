const express = require("express");
const router = express.Router();
const Booking = require("../Models/Booking");
const nodemailer= require("nodemailer");

router.post("/create", async (req, res) => {
    try {
        const { customerId, hostId, listingId, startDate, endDate, totalPrice, customerEmail } = req.body;

        // Create a new booking instance
        const newBooking = new Booking({
            customerId,
            hostId,
            listingId,
            startDate,
            endDate,
            totalPrice,
            customerEmail
        });

        // Save the new booking to the database
        await newBooking.save();

        res.status(200).json({ message: "Your booking has been done", booking: newBooking });
    } catch (error) {
        console.error("There is something wrong:", error.message);
        res.status(400).json({ message: "There is something wrong, unable to book now" });
    }
});
router.get('/get',async(req,res)=>{
    try {
        const Bookings=await Booking.find()
        res.status(200).json({booking:Bookings})
        
    } catch (error) {
        console.log("not found ",error.message)
        res.status(400).json({message:"error something  as, dasm dwrong"})
        
    }
})

module.exports = router;
