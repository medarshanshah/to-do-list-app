require('dotenv').config()
const express = require("express");
const mongoose = require("mongoose");

//models
const TodoTask = require("./models/todotask");

const app = express();

app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));


//connection to db
mongoose.connect(process.env.DB_CONNECT).then(() => {
        console.log("Connected to db!");
        app.listen(process.env.PORT, () => console.log("Server Up and running"));
    })
  .catch((err) => {
        console.log("Error connecting to DB");
    });

// GET METHOD
app.get("/", async (req, res) => {
    const tasks = await TodoTask.find({});
    res.render("todo.ejs", { todoTasks: tasks });
});

//POST METHOD
app.post('/',async (req, res) => {
    const todoTask = new TodoTask({
    title: req.body.title
    shortDesc: req.body.title
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
            await TodoTask.findByIdAndUpdate(id, { content: req.body.content });
        }
        catch(err) {
            return res.send(500, err);
        }
        res.redirect("/");
        
        // if (err) return res.send(500, err);
        // res.redirect("/");
    })

//DELETE
app.route("/remove/:id").get(async (req, res) => {
    const id = req.params.id;
    try {
        await TodoTask.findByIdAndRemove(id);
    } catch (err) {
        return res.send(500, err);
    }
    res.redirect("/");
});