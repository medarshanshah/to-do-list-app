require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const app = express();

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.set("view engine", "ejs");

//connection to db
try {
    mongoose.connect(process.env.DB_CONNECT);
    console.log("Connected to MongoDB!");
    app.listen(3000, () => console.log("Server Up and running"));
} catch (error) {
    console.log("Error connecting MongoDB", error);
}

app.get('/',(req, res) => {
    res.render("todo.ejs");
});

app.post('/',(req, res) => {
    console.log(req.body);
});