const mongoose=require("mongoose");
const BookingSchema=new mongoose.Schema({
    customerId:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    hostId:
    {
        type:String,
        required:true,
    },
    listingId:
     {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Listing",
      },
      startDate:
     {
        type: String,
        required: true,
      },
      endDate: 
      {
        type: String,
        required: true,
      },
      totalPrice:
       {
        type: Number,
        required: true,
      },
      customerEmail:
      {
      type:String,

      }
    },
    { timestamps: true }
)
const Booking =mongoose.model("Booking",BookingSchema)
module.exports=Booking