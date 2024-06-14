const Users = require('../Models/User.js');
const express = require('express');
const app = express();
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');

// Middleware to parse JSON bodies
app.use(express.json());

// Display data
router.get('/', async (req, res) => {
    try {
        const users = await Users.find();
        res.status(200).json(users);
    } catch (error) {
        console.log(error);
        res.status(400).json({ message: 'There is something wrong' });
    }
});

// Storing images for profile pic
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "public/Uploads/");
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage });

// User Register
router.post('/register', upload.single("profileImage"), async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        const profileImage = req.file;

        if (!profileImage) {
            return res.status(400).json({ message: "Image is not available" });
        }

        const profileImagePath = profileImage.path;
        const existingUser = await Users.findOne({ email });

        if (existingUser) {
            console.log("User already exists, please login");
            return res.status(409).json({ message: 'User already exists' });
        }

        const saltRounds = 10;
        const hashedPassword = await bcrypt.hash(password, saltRounds);

        const newUser = new Users({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            profileImagePath
        });

        // Save the new user before sending the response
        await newUser.save();
        res.status(201).json({ message: 'Registered successfully', newUser });
        
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Registration failed!", error: err.message });
    }
});

// User Login (Placeholder, not implemented in your original code)
// router.post('/login', async (req, res) => {
//     // Implementation for login
// });

module.exports = router;
