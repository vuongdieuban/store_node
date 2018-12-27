const { User, validate } = require('../models/users');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

router.get('/', async (req, res) => {
    const users = await User.find().sort(username);
    res.status(200).send(users);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // Check to ensure no two duplicate email (each registered user assosiate with one unique email)
    let user = await User.findOne({ email: req.body.email })
    if (user) return res.status(400).send('User already registered');

    user = new User({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });
    user = await user.save();
    res.status(200).send(user);
});

module.exports = router;    