const Joi = require('joi');
const mongoose = require('mongoose');

// MongoDB model for Genre collection
const Genre = mongoose.model('Genre', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    }
}));


/** ------------------Utils functions------------------ */
// Validating req.body
function validateReq(body) {
    const schema = {
        name: Joi.string().min(5).required()
    };
    const result = Joi.validate(body, schema);
    return result;
}

module.exports.Genre = Genre;
module.exports.validate = validateReq;