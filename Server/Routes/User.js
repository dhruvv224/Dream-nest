const Users = require('../Models/User.js');
const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const multer = require('multer');
const Listing=require('../Models/Listings.js')
require('dotenv').config();  // Load environment variables

// Middleware to parse JSON bodies
const app = express();
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
// Adding listings inside wishlist
router.patch("/:userId/wishlist", async (req, res) => {
    const { userId } = req.params;
    const { wishlistItems } = req.body; // Fixed capitalization

    try {
        const user = await Users.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        wishlistItems.forEach(item => {
            if (!user.wishList.includes(item)) {
                user.wishList.push(item);
            }
        });

        await user.save();
        res.status(200).json(user);
        console.log('Updated user:', user);
    } catch (error) {
        console.error('Error updating wishlist:', error);
        res.status(500).json({ message: 'Server error' });
    }
});
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

// User Login
router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await Users.findOne({ email });
        if (!user) {
            return res.status(409).json({ message: "User does not exist" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials!" });
        }

        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(200).json({ token, user });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Login failed!", error: error.message });
    }
});

module.exports = router;
