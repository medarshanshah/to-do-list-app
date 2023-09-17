require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");
const TodoTask = require("./models/todotask");
const { check, validationResult } = require('express-validator');

let validator = [
    check('title').isString(),
    check('desc').isString()
]

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

// GET METHOD
app.get("/", async (req, res) => {
    const tasks = await TodoTask.find({});
    res.render("todo.ejs", { todoTasks: tasks });
});

//POST METHOD
app.post('/', validator, async (req, res) => {
    const todoTask = new TodoTask({
        title: req.body.title,
        desc: req.body.desc
    });
    try {
        await todoTask.save();
    } catch (error) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        return res.send(500, error);
    }
    res.redirect("/");
});

//UPDATE
app.route("/edit/:id")
.get(async (req, res) => {
    const id = req.params.id;
    const tasks = await TodoTask.find({});
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
})
.post(validator, async (req, res) => {
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndUpdate(id, { 
            title: req.body.title,
            desc: req.body.desc 
        });
    } catch (error) {
        const errors = validationResult(req);
        if (!errors.isEmpty())
        return res.send(500, error);
    }
    res.redirect("/");
});

//DELETE
app.route("/remove/:id").get(async (req, res) => {
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndRemove(id)
    } catch (error) {
        return res.send(500, error);
    }
    res.redirect("/");
});