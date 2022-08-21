const express = require("express");
const apiPost = express.Router();
const Note = require("../../modals/notes");
const User  = require("../../modals/users");


const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
var fetchuser = require('../../middleware/fetchuser');

apiPost.post("/api/signup", [
    body('name', 'Enter a valid name').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({ min: 5 }),
],async (req,res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try{
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: req.body.email });
        if (user) {
            return res.status(400).json({ error: "Sorry a user with this email already exists" })
        }
        const salt = await bcrypt.genSalt(10);
        const secPass = await bcrypt.hash(req.body.password, salt);
        // Create a new user
        user = await User.create({
            name: req.body.name,
            password: secPass,
            email: req.body.email,
        });
        
    const data = {
      user: {
        id: user.id
      }
    }
    const authtoken = jwt.sign(data, process.env.SECRET_KEY);
    res.json({ authtoken, success:"you are registered" })
    }
    catch(error){
console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})
apiPost.post("/api/login", [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must not be empty').exists(),
],async (req,res) => {
    // If there are errors, return Bad request and the errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;

    try{
        // Check whether the user with this email exists already
        let user = await User.findOne({ email: email });
        if (!user) {
                  return res.status(400).json({ error: "Please try to login with correct credentials" });

        }
        const passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            return res.status(400).json({  error: "Please try to login with correct credentials" });
        }
        const data = {
            user: {
                id: user.id
            }
        }
        const authtoken = jwt.sign(data, process.env.SECRET_KEY);
        res.json({ authtoken, success: "You are login in successfully" })
     
    }
    catch(error){
console.error(error.message);
    res.status(500).send("Internal Server Error");
    }
})


apiPost.post("/api/getuser",fetchuser, async (req,res)=>{
    try {
        userId = req.user.id;
        const user = await User.findById(userId).select("-password")
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})


/**
 * ! for notes apis 
 */


apiPost.post("/api/addnote", fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Description must be atleast 5 characters').isLength({ min: 5 }),] , async (req,res)=>{
    try {
        const { title, description, tag } = req.body;

        // If there are errors, return Bad request and the errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        const note = new Note({
            title, description, tag, user: req.user.id
        })
        const savedNote = await note.save()

        res.json({savedNote})

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    }
})
apiPost.get("/api/fetchnotes", fetchuser , async (req,res)=>{
    try {
        const notes = await Note.find({ user: req.user.id });
        res.json({notes})
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
    } 
})
apiPost.get("/api/verification", fetchuser , async (req,res)=>{
    res.send({message : "success"})
})

module.exports = apiPost;
