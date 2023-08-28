const express = require('express');
const router = express.Router();
const User = require('../models/User');  // passing the User.js schema from models
const { body, validationResult } = require('express-validator');  // using the express validator
const bcrypt = require('bcryptjs');  // bcrypt provides us to give hash passwords securely for the security purpose as we are not going to directly save the password in the database, we will be saving the hash password

const jwt = require('jsonwebtoken');  // JWT is use for authentication and authorization purpose, consist of 3 parts - header, payload and signature
const JWT_SECRET = 'mohitdhakad16';  // we will be signing into web token through jwt_secret
const fetchUser = require('../middleware/fetchUser');  // getting the middleware fetch user

// Route 1: Creating a user using POST: "api/auth/createuser/" ...this doesn't require auth - No login required
router.post('/createuser', [
    body('username', 'Enter a valid username').isLength({ min: 3 }),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], async (req, res) => {
    let success = false;

    // If there are error return bad request and the error
    const errors = validationResult(req);

    // if the errors variable is not empty means it has error then return a bad request response
    if (!errors.isEmpty()) {
        return res.status(400).json({ success, errors: errors.array() });
    }

    // wrapping this in try-catch 
    try {
        // Check whether the user already exists or not
        let user = await User.findOne({ email: req.body.email })
        // User.findone is a database query to find a single document (record) in a collection based on a specific condition.
        if (user) {
            // if the user already exist return this error
            return res.status(400).json({ success, error: "User with this email already exist" })
        }
        // if the user doesn't exist create a new User and store it in the user varaible

        const salt = await bcrypt.genSalt(5);  // This will generate a salt for hashing the computational ,complexity of the hashing process adjusted to balance security process and performance

        const secPassword = await bcrypt.hash(req.body.password, salt);  // This will take the password and salt and generate a hash password

        user = await User.create({
            username: req.body.username,
            email: req.body.email,
            password: secPassword,
        })

        const data = {
            user: {
                id: user.id // here we will send the id so the data retrive will be fast and easy
            }
        }
        const token = jwt.sign(data, JWT_SECRET);  //jwt.sign takes 2 arguments (data,secret) and this will return a promise
        success = true;
        res.json({ success, token });  // we are using here ES6 so we can get the response in json format

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Server Error' })
    }
})


// Route 2: Authenticate user using credentails from POST: "api/auth/login/" - No login required
// note: keep the create user body data same as login

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'password cannot be blanked').exists(),
], async (req, res) => {
    // If there are error return bad request and the error
    const errors = validationResult(req);

    // if the errors variable is not empty means it has error then return a bad request response
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    // destructuring the objects and removing out the password and email and storing it in the req.body
    const { email, password } = req.body;
    let success = false;
    try {
        let user = await User.findOne({ email }); // pulling the user from the database
        if (!user) {
            // if email doesn't exist in the database
            success = false;
            return res.status(400).send({ success, error: 'Kindly enter correct credentials' })
        }
        let passwordCompare = await bcrypt.compare(password, user.password);
        if (!passwordCompare) {
            // if Password doesn't get matched
            success = false;
            return res.status(400).send({ success, error: 'Kindly enter correct credentials' });
        }

        // if the password is correct send a payload - data of user[id]
        const data = {
            user: {
                id: user.id
            }
        }
        const token = jwt.sign(data, JWT_SECRET);  //jwt.sign takes 2 arguments (data,secret) and this will return a promise
        success = true;
        res.json({ success, token });   // we are using here ES6 so we can get the response in json format

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Server Error' })
    }
});

// Route 3 : Get logged in user details using : POST "/api/auth/getuser/""  - Login required

router.post('/getuser', fetchUser, async (req, res) => {
    try {
        const userID = req.user.id;
        const user = await User.findById(userID).select('-password');
        // findById: to find the single document from the id field
        // select:which document to include or exclude (include),(-exclude)
        res.send(user)

    } catch (error) {
        console.log(error.message);
        res.status(400).send({ error: 'Internal Server Error' })
    }
});

module.exports = router;