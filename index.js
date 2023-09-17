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

// GET METHOD
app.get("/", async (req, res) => {
    const tasks = await TodoTask.find({});
    res.render("todo.ejs", { todoTasks: tasks });
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

//UPDATE
app.route("/edit/:id")
.get(async (req, res) => {
    const id = req.params.id;
    const tasks = await TodoTask.find({});
    res.render("todoEdit.ejs", { todoTasks: tasks, idTask: id });
})
.post(async (req, res) => {
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndUpdate(id, { 
            title: req.body.title,
            desc: req.body.desc 
        });
    } catch (error) {
        return res.send(500, error);
    }
    res.redirect("/");
});