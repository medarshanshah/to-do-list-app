require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const TodoTask = require("./models/todotask");

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

//POST METHOD
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
        title: req.body.title,
        desc: req.body.desc
    });
    try {
        await todoTask.save();
        res.redirect("/");
    } catch (err) {
        res.redirect("/");
    }
});