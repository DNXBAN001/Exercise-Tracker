const express = require("express");

const router = express.Router();

let User = require("../models/user");

// Add new user  /user s/add
router.route("/add").post(async (req, res) => {
    const { username, password } = req.body
    if(!username || !password){
        return res.status(401).json({success: false, msg: "Make sure to not leave username and password blank..."})
    }
    try{
        const user = new User({ username, password })
        const newUser = await user.save()
        res.status(201).json({success: true, msg: "New user created succesfully: "+newUser})
    }catch(err){
        res.status(400).json({success: false, msg: "The username already exists, create new..."})
    }
})

//Get all users
router.route("/").get(async (req, res) => {
    try{
        const userCollection = await User.find()
        res.status(200).json({success: true, msg: userCollection})
    }catch(err){
        return res.status(400).json({success: false, msg: "There was an error fetching the users..."})
    }
})

//Update user details by id
router.route("/update/:id").put(async (req, res) => {
    const id = req.params.id
    const { username, password} = req.body
    if(!username || !password){
        return res.status(400).json({success: false, msg: "Make sure to enter both username and password..."})
    }
    try{
        const user = await User.findById(id)
        user.username = username
        user.password = password
        const newUser = await user.save()
        res.status(200).json({success: true, msg: "User updated successfully..."})
    }catch(err){
        return res.status(400).json({success: false, msg: "Error while updating the user... try checking the id"})
    }
})

//Remove user by id
router.route("/:id").delete(async (req, res) => {
    try{
        // const user = await User.findById(req.params.id)
        await User.findByIdAndRemove(req.params.id)
        res.status(200).json({success: true, msg: "User deleted succesfully..."})
    }catch(err){
        return res.status(400).json({success: true, msg: "Error...user with the id could not be found"})
    }
})

module.exports = router;