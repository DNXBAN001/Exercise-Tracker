const express = require("express");

const Exercise = require("../models/exercise");

const router = express.Router();

// Handle routes
// Add exercise  /exercises/add
router.route("/add").post(async (req, res) => {
    const { username, description, duration, date } = req.body
    if(!username || !description || !duration || !date){
        return res.status(400).json({success: false, msg: "Make sure to not leave anything blank..."})
    }
    const exercise = new Exercise({
        username,
        description,
        duration,
        date
    })
    try{
        const newExercise = await exercise.save()
        res.status(201).json({success: true, msg: "Exercise added successfully..."+newExercise})
    }catch(err){
        return res.status(400).json({success: false, msg: "Problem with saving the exercise..."})
    }
})

//Get all exercises
router.route("/").get(async (req, res) => {
    try{
        const exercises = await Exercise.find()
        res.status(200).json({success: true, data: exercises})
    }catch(err){
        return res.status(400).json({success: false, msg: "There was an error fetching the exercises..."})
    }
})

//Update exercise by id
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id
    const { username, description, duration, date } = req.body
    if(!username || !description || !duration || !date){
        return res.status(400).json({success: false, msg: "Make sure to enter all exercise details"})
    }
    try{
        const exercise = await Exercise.findById(id)
        exercise.username = username
        exercise.description = description
        exercise.duration = Number(duration)
        exercise.date = date
        const newExercise = await exercise.save()
        res.status(201).json({success: true, msg: "Exercise updated successfully..."})
    }catch(err){
        return res.status(400).json({success: false, msg: "Failed updating the exercise...check the id"})
    }
})

//Remove exercise by id
router.route("/:id").delete(async (req, res) => {
    try{
        // const exercise = await Exercise.findById(req.params.id)
        await Exercise.findByIdAndRemove(req.params.id)
        res.status(200).json({success: true, msg: "Exercise deleted successfully..."})
    }catch(err){
        return res.status(400).json({success: false, msg: "Error deleting the exercise...id could not be found"})
    }
})

module.exports = router;