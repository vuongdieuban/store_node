const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// MongoDB model for Genre collection
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: Number,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    isGold: {
        type: boolean,
        required: true,
    }
}));



module.exports = router;