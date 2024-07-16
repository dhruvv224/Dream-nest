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
        let transporter=nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:'dhruvparmar2204@gmail.com',
                pass: 'jelw wmrs scvx hsrc'
        
            }
        })
        let mailOption={
            from:'"Dhruv parmar"<dhruvparmar2204@gmail.com>',
            to:customerEmail,
            subject:'Your Booking Confirmation with Dream Nest Hotel Stays and Villas',
            text:`Dear ${hostId} We are pleased to inform you that your booking has been successfully completed. Your stay is confirmed from ${startDate} to ${endDate}. Enjoy your holidays with us and experience the best in comfort and luxury.`,
            html: `
            <!DOCTYPE html>
            <html>
            <head>
                <title>Booking Confirmation</title>
            </head>
            <body>
                <p>Dear ${hostId},</p>
                <p>We are pleased to inform you that your booking has been successfully completed. Your stay is confirmed from ${startDate} to ${endDate}. Enjoy your holidays with us and experience the best in comfort and luxury.</p>
                <p>Thank you for choosing Dream Nest Hotel Stays and Villas.</p>
                <p>Best regards,<br/>
                Dream Nest Hotel Stays and Villas</p>
            </body>
            </html>
        `

        }
        transporter.sendMail(mailOption,(error,info)=>{
            if(error)
            {
                return console.log("there is an error",error)

            }
            console.log('Message sent',info.messageId)
            console.log('privew URL',nodemailer.getTestMessageUrl)
        })
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
