"use strict";

var jwt = require("jsonwebtoken");

var express = require("express");

var cookies = require("cookie-parser");

var router = express.Router();

require("../db/conn");

var User = require("../model/userSchema");

var bcrypt = require("bcryptjs"); // const authenticate = require("../middleware/authenticate");


router.get("/", function(req, res) {
    res.send("Hello world from server router js");
});
router.post("/register", function _callee(req, res) {
    var _req$body, name, email, phone, work, password, cpassword, userExist, user;

    return regeneratorRuntime.async(function _callee$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _req$body = req.body, name = _req$body.name, email = _req$body.email, phone = _req$body.phone, work = _req$body.work, password = _req$body.password, cpassword = _req$body.cpassword;

                    if (!name || !email || !phone || !work || !password || !cpassword) {
                        res.status(422).json({
                            error: "Please fill all the filled properly"
                        });
                    }

                    _context.prev = 2;
                    _context.next = 5;
                    return regeneratorRuntime.awrap(User.findOne({
                        email: email
                    }));

                case 5:
                    userExist = _context.sent;

                    if (!userExist) {
                        _context.next = 10;
                        break;
                    }

                    res.status(422).json({
                        error: "user already exist"
                    });
                    _context.next = 18;
                    break;

                case 10:
                    if (!(password !== cpassword)) {
                        _context.next = 14;
                        break;
                    }

                    res.status(422).json({
                        error: "Please filled the correct cpassword"
                    });
                    _context.next = 18;
                    break;

                case 14:
                    user = new User({
                        name: name,
                        email: email,
                        phone: phone,
                        work: work,
                        password: password,
                        cpassword: cpassword
                    });
                    _context.next = 17;
                    return regeneratorRuntime.awrap(user.save());

                case 17:
                    res.status(201).json({
                        message: "user Registered successfully"
                    });

                case 18:
                    _context.next = 23;
                    break;

                case 20:
                    _context.prev = 20;
                    _context.t0 = _context["catch"](2);
                    console.log(_context.t0);

                case 23:
                case "end":
                    return _context.stop();
            }
        }
    }, null, null, [
        [2, 20]
    ]);
});
router.post("/signin", function _callee2(req, res) {
    var token, _req$body2, email, password, userLogin, isMatch;

    return regeneratorRuntime.async(function _callee2$(_context2) {
        while (1) {
            switch (_context2.prev = _context2.next) {
                case 0:
                    console.log("hi i am from server side");
                    _context2.prev = 1;
                    _req$body2 = req.body, email = _req$body2.email, password = _req$body2.password;

                    if (!email || !password) {
                        res.status(422).json({
                            error: "Please fill all the filled properly"
                        });
                    }

                    _context2.next = 6;
                    return regeneratorRuntime.awrap(User.findOne({
                        email: email
                    }));

                case 6:
                    userLogin = _context2.sent;

                    if (!userLogin) {
                        _context2.next = 19;
                        break;
                    }

                    _context2.next = 10;
                    return regeneratorRuntime.awrap(bcrypt.compare(password, userLogin.password));

                case 10:
                    isMatch = _context2.sent;
                    _context2.next = 13;
                    return regeneratorRuntime.awrap(userLogin.generateAuthToken());

                case 13:
                    token = _context2.sent;
                    console.log(token);
                    res.cookie("jwtoken", token, {
                        expires: new Date(Date.now() + 25892000000),
                        httpOnly: true
                    });

                    if (isMatch) {
                        res.status(201).json({
                            message: "user login successfully"
                        });
                    } else {
                        res.status(400).json({
                            error: "invalid credientials"
                        });
                    }

                    _context2.next = 20;
                    break;

                case 19:
                    res.status(400).json({
                        error: "invalid credientials"
                    });

                case 20:
                    _context2.next = 25;
                    break;

                case 22:
                    _context2.prev = 22;
                    _context2.t0 = _context2["catch"](1);
                    console.log(_context2.t0);

                case 25:
                case "end":
                    return _context2.stop();
            }
        }
    }, null, null, [
        [1, 22]
    ]);
});

var Authenticate = function Authenticate(req, res, next) {
    var token, verifyToken, rootUser;
    return regeneratorRuntime.async(function Authenticate$(_context3) {
        while (1) {
            switch (_context3.prev = _context3.next) {
                case 0:
                    _context3.prev = 0;
                    token = req.cookies.jwtoken;
                    verifyToken = jwt.verify(token, process.env.SECRET_KEY);
                    _context3.next = 5;
                    return regeneratorRuntime.awrap(User.findOne({
                        _id: verifyToken._id,
                        "tokens.token": token
                    }));

                case 5:
                    rootUser = _context3.sent;

                    if (rootUser) {
                        _context3.next = 8;
                        break;
                    }

                    throw new Error("User not found");

                case 8:
                    req.token = token;
                    req.rootUser = rootUser;
                    req.userID = rootUser._id;
                    next();
                    _context3.next = 18;
                    break;

                case 14:
                    _context3.prev = 14;
                    _context3.t0 = _context3["catch"](0);
                    console.log(_context3.t0);
                    res.status(401).send("Unauthorised : No token will be found");

                case 18:
                case "end":
                    return _context3.stop();
            }
        }
    }, null, null, [
        [0, 14]
    ]);
};

router.get("/About", Authenticate, function(req, res) {
    res.send(req.rootUser);
});
router.get("/getData", Authenticate, function(req, res) {
    res.send(req.rootUser);
});
router.get("/Logout", function(req, res) {
    res.clearCookie("jwtoken", {
        path: "/"
    });
    res.status(200).send("user Logout");
    console.log("hi abhi");
});
router.post("/Contact", Authenticate, function _callee3(req, res) {
    var _req$body3, name, email, phone, message, userContact, userMessage;

    return regeneratorRuntime.async(function _callee3$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    _context4.prev = 0;
                    _req$body3 = req.body, name = _req$body3.name, email = _req$body3.email, phone = _req$body3.phone, message = _req$body3.message;

                    if (!(!name || !email || !phone || !message)) {
                        _context4.next = 4;
                        break;
                    }

                    return _context4.abrupt("return", res.json({
                        error: "Please filled properly contact form"
                    }));

                case 4:
                    _context4.next = 6;
                    return regeneratorRuntime.awrap(User.findOne({
                        _id: req.userID
                    }));

                case 6:
                    userContact = _context4.sent;

                    if (!userContact) {
                        _context4.next = 14;
                        break;
                    }

                    _context4.next = 10;
                    return regeneratorRuntime.awrap(userContact.addMessage(name, email, phone, message));

                case 10:
                    userMessage = _context4.sent;
                    _context4.next = 13;
                    return regeneratorRuntime.awrap(userContact.save());

                case 13:
                    res.status(201).json({
                        message: "user contact save successfully"
                    });

                case 14:
                    _context4.next = 19;
                    break;

                case 16:
                    _context4.prev = 16;
                    _context4.t0 = _context4["catch"](0);
                    console.log(_context4.t0);

                case 19:
                case "end":
                    return _context4.stop();
            }
        }
    }, null, null, [
        [0, 16]
    ]);
});
module.exports = router;