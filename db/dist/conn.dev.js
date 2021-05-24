"use strict";

var mongoose = require("mongoose");

var DB = process.env.DATABASE;
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
}).then(function() {
    console.log("connection successfull");
})["catch"](function(e) {
    console.log("no connection due to ".concat(e));
});