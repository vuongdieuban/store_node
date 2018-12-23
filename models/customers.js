const Joi = require('joi');
const mongoose = require('mongoose');


// MongoDB model for Customer collection
const Customer = mongoose.model('Customer', new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 50
    },
    phone: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 10
    },
    isGold: {
        type: Boolean,
        default: false,
    }
}));

// Validate Customer
function validateCustomer(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        phone: Joi.string().min(5).max(10).required(),
        isGold: Joi.boolean()
    };
    const result = Joi.validate(customer, schema);
    return result;
}


module.exports.Customer = Customer;
module.exports.validate = validateCustomer;