const bcrypt = require('bcrypt');
const _ = require('lodash');
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

    // Using bscrypt to generate salt and hashing password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    user = await user.save();

    // Using lodash library to send specific properties of object
    // can also be used when create new User(_pick(req.body,['username','email','password']));
    res.status(200).send(_.pick(user, ['_id', 'username', 'email']));
});

module.exports = router;    