"use strict";

var dotenv = require("dotenv");

var express = require("express");

var cookieParser = require("cookie-parser");

var app = express();

var cors = require("cors");

dotenv.config({
    path: "./config.env"
});

require("./db/conn");

app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"));
app.use(cors());
var PORT = 5000; // const PORT = process.env.PORT || 8000
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));

app.listen(PORT, function() {
    console.log("The server listen at port ".concat(PORT));
});