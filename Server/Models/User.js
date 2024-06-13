const express =require('express')
const app=express();
const mongoose=require('mongoose');
const UserSchema= new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
      },
      lastName: {
        type: String,
        required: true,
      },
      email: {
        type: String,
        required: true,
        unique: true,
      },
      password: {
        type: String,
        required: true,
      },
      profileImagePath: {
        type: String,
        default: "",
      },
      tripList: {
        type: Array,
        default: [],
      },
      wishList: {
        type: Array,
        default: [],
      },
      propertyList: {
        type: Array,
        default: [],
      },
      reservationList: {
        type: Array,
        default: [],
      }
})
const User=mongoose.model('Users',UserSchema)
module.exports=User