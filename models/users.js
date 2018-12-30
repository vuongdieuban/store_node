const config = require('config');
const jwt = require('jsonwebtoken');
const Joi = require('joi');
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024
    }
});

// Add method to userSchema (user object), 'this' refer to specific user object
userSchema.methods.generateAuthToken = function () {
    const token = jwt.sign({ _id: this._id }, config.get('jwtPrivateKey'));
    return token;
};

const User = new mongoose.model('User', userSchema);


// Validate Customer
function validateUser(user) {
    const schema = {
        username: Joi.string().alphanum().min(5).max(50).required(),
        email: Joi.string().email({ minDomainAtoms: 2 }).min(5).max(255).required(),
        password: Joi.string().min(5).max(255).required()
    };
    const result = Joi.validate(user, schema);
    return result;
}


module.exports.User = User;
module.exports.validate = validateUser;