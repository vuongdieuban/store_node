const bcrypt = require('bcrypt');
const _ = require('lodash');
const { User } = require('../models/users');
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// Login -- Authentication, Client store the token in local storage and send token to protected routes to gain access
// Logout -- Responsible on the client side, delete the token to logout
router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check to ensure user is valid
    let user = await User.findOne({ email: req.body.email })
    if (!user) return res.status(400).send('Invalid email or password');

    const validPassword = await bcrypt.compare(req.body.password, user.password)
    if (!validPassword) return res.status(400).send('Invalid email or password');

    const token = user.generateAuthToken();
    res.send(token);
});

// Validate info User sent in for authentication
function validate(user) {
    const schema = {
        email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
    const result = Joi.validate(user, schema);
    return result;
}


module.exports = router;    