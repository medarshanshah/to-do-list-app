require('dotenv').config()
const express = require("express");
const app = express();

app.use("/static", express.static("public"));

app.get('/',(req, res) => {
    res.render("todo.ejs");
});

app.listen(process.env.PORT, () => console.log("Server Up and running"));
