"use strict";

var jwt = require("jsonwebtoken");

var User = require("../model/userSchema");

var Authenticate = function Authenticate(req, res, next) {
    var token, verifyToken, rootUser;
    return regeneratorRuntime.async(function Authenticate$(_context) {
        while (1) {
            switch (_context.prev = _context.next) {
                case 0:
                    _context.prev = 0;
                    token = req.cookies.jwt;
                    verifyToken = jwt.verify(token, process.env.SECRET_KEY);
                    _context.next = 5;
                    return regeneratorRuntime.awrap(User.findOne({
                        _id: verifyToken._id,
                        "tokens.token": token
                    }));

                case 5:
                    rootUser = _context.sent;

                    if (rootUser) {
                        _context.next = 8;
                        break;
                    }

                    throw new Error("User not found");

                case 8:
                    req.token = token;
                    req.rootUser = rootUser;
                    req.userID = rootUser._id;
                    next();
                    _context.next = 18;
                    break;

                case 14:
                    _context.prev = 14;
                    _context.t0 = _context["catch"](0);
                    console.log(_context.t0);
                    res.status(401).send("Unauthorised : No token will be found");

                case 18:
                case "end":
                    return _context.stop();
            }
        }
    }, null, null, [
        [0, 14]
    ]);
};

module.exports = Authenticate;