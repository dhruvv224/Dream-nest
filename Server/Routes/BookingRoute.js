const express =require("express")
const router=express.Router();
const Booking =require("../Models/Booking");
router.post("/create",async(req,res)=>{
    try {
        const {customerId, hostId, listingId, startDate, endDate, totalPrice}=req.body;
        const newBooking =new Booking({customerId, hostId, listingId, startDate, endDate, totalPrice})
        await Booking.save();
        res.status(200).json({message:"Your booking has been done ",Booking:newBooking})

        
    } catch (error) {
        console.log("there is something wrong ",error.message);
        res.status(400).json({message:"there something wrong unable to book now "})
        
    }
})
