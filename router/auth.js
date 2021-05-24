const jwt = require("jsonwebtoken");
const express = require("express");
const cookies = require("cookie-parser");

const router = express.Router();
require("../db/conn");
const User = require("../model/userSchema");
const bcrypt = require("bcryptjs");
// const authenticate = require("../middleware/authenticate");
router.get("/", (req, res) => {
    res.send("Hello world from server router js");
});
router.post("/register", async(req, res) => {
    const { name, email, phone, work, password, cpassword } = req.body;
    if (!name || !email || !phone || !work || !password || !cpassword) {
        res.status(422).json({ error: "Please fill all the filled properly" });
    }
    try {
        const userExist = await User.findOne({ email: email });
        if (userExist) {
            res.status(422).json({ error: "user already exist" });
        } else if (password !== cpassword) {
            res.status(422).json({ error: "Please filled the correct cpassword" });
        } else {
            const user = new User({ name, email, phone, work, password, cpassword });
            await user.save();
            res.status(201).json({ message: "user Registered successfully" });
        }
    } catch (err) {
        console.log(err);
    }
});
router.post("/signin", async(req, res) => {
    console.log("hi i am from server side");
    try {
        let token;
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(422).json({ error: "Please fill all the filled properly" });
        }
        const userLogin = await User.findOne({ email: email });
        if (userLogin) {
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            console.log(token);
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true,
            });
            if (isMatch) {
                res.status(201).json({ message: "user login successfully" });
            } else {
                res.status(400).json({ error: "invalid credientials" });
            }
        } else {
            res.status(400).json({ error: "invalid credientials" });
        }
    } catch (err) {
        console.log(err);
    }
});
const Authenticate = async(req, res, next) => {
    try {
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY);
        const rootUser = await User.findOne({
            _id: verifyToken._id,
            "tokens.token": token,
        });
        if (!rootUser) {
            throw new Error("User not found");
        }
        req.token = token;
        req.rootUser = rootUser;
        req.userID = rootUser._id;
        next();
    } catch (err) {
        console.log(err);
        res.status(401).send("Unauthorised : No token will be found");
    }
};

router.get("/About", Authenticate, (req, res) => {
    res.send(req.rootUser);
});
router.get("/getData", Authenticate, (req, res) => {
    res.send(req.rootUser);
});

router.get("/Logout", (req, res) => {
    res.clearCookie("jwtoken", { path: "/" });
    res.status(200).send("user Logout");
    console.log("hi abhi");
});
router.post("/Contact", Authenticate, async(req, res) => {
    try {
        const { name, email, phone, message } = req.body;
        if (!name || !email || !phone || !message) {
            return res.json({ error: "Please filled properly contact form" });
        }
        const userContact = await User.findOne({ _id: req.userID });
        if (userContact) {
            const userMessage = await userContact.addMessage(name, email, phone, message);
            await userContact.save();
            res.status(201).json({ message: "user contact save successfully" });

        }

    } catch (err) {
        console.log(err);
    }

})

module.exports = router;