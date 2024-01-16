const express = require("express");

const cors = require("cors");

const mongoose = require("mongoose")

require("dotenv").config();
const port = process.env.PORT || 5000;

const app = express();

//provides express middleware that can enable calls with different options
//Makes it easy say for example ypu want to access something outside your server
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

app.use("/users", usersRouter) // /users routes
app.use("/exercises", exercisesRouter) // /exercises routes

app.listen(port, () => {
    console.log("Server is listening on port "+port)
})