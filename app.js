const dotenv = require("dotenv");
const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const cors = require("cors");
dotenv.config({ path: "./config.env" });
require("./db/conn");
app.use(express.json());
app.use(cookieParser());
app.use(require("./router/auth"));

app.use(cors());
const PORT = 5000;
// const PORT = process.env.PORT || 8000
// if (process.env.NODE_ENV === "production") {
//     app.use(express.static("client/build"));


app.listen(PORT, () => {
    console.log(`The server listen at port ${PORT}`);
});