const express = require("express");
const router = express.Router();
const User = require("../models/User"); 
const { Sequelize } = require("sequelize"); // ORM 
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { authenticateJWT } = require("../middleware/authenticateJWT");
require('dotenv').config();

router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const existingUser = await User.findOne({ // searches for user in db based on emaul and username
            where: {
                [Sequelize.Op.or]: [{username}, {email}],
            },
        });

        if (existingUser) { // if that searched for user exists then 
            return res.status(400).json({ error: "Username or email already used in the db."});
        }

        const user = await User.create({ username, password, email });
        res.status(201).json(user);
    } catch (err) {
        res.status(500).json({ error: "Could not register user." });
    }
});

const jwtKey = process.env.JWT_SECRET_KEY; 

router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ where: {email} }); // seatrches and ensures user is in db
        if (!user) return res.status(400).json({ error: "User not found in db"});
        
        console.log("Login attempt:");
        console.log("Input password:", password);
        console.log("Hashed password from DB:", user.password);


        const match = await bcrypt.compare(password, user.password); // compares input password with the actual correct password 
        if (!match) return res.status(401).json({ error: "Incorrect password" });
    
        const token = jwt.sign({ uid: user.uid, username: user.username, email: user.email }, jwtKey, { // creates a signed token with the user id and email
          expiresIn: "4h", // token expiration
        });
    
        res.json({ token });
    } 
    catch {
        res.status(500).json({ error: "Login failed", "password": password });
    }
}); 

router.get("/isAuthenticated", authenticateJWT, (req, res) => {
    res.json({ message: "PROTECTED LOGIN ROUTE", user: req.user });
});

module.exports = router;