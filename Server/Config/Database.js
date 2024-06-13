const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect('mongodb://localhost:27017/dreamNest')
         
        console.log(`Connection established successfully to: ${conn.connection.host}`);
    } catch (error) {
        console.log("There is something wrong, try again later", error);
    }
};

module.exports = connectDB;
