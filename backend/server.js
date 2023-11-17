const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose")

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

app.use(cors());

app.use(express.json())

app.use(express.urlencoded({extended: false}))

const url = "mongodb://127.0.0.1/Exercise-Tracker"
mongoose.connect(url, {useNewUrlParser: true});
const con = mongoose.connection;
con.on("open", () => {
    console.log("Database connection is established...")
})

const usersRouter = require("./routes/users")
const exercisesRouter = require("./routes/exercises")

app.use("/users", usersRouter)
app.use("/exercises", exercisesRouter)

app.listen(port, () => {
    console.log("Server is listening on port "+port)
})