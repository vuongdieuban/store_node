const Joi = require('joi');
const { genreSchema } = require('./genres');
const mongoose = require('mongoose');

const Rental = mongoose.model('Rental', new mongoose.Schema({
    /** Define new customerSchema to include the essentials info of customers only, 
    the actual customer model might have more info than needed*/
    customer: {
        type: new mongoose.Schema({
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
        }),
        required: true
    },

    movie: {
        type: new mongoose.Schema({
            name: {
                type: String,
                required: true,
                minlength: 5,
                maxlength: 200
            },
            genre: {
                type: genreSchema,
                required: true
            }
        }),
        required: true
    },

    dateRented: {
        type: Date,
        required: true,
        default: Date.now
    },

    dateReturned: {
        type: Date,
    },

    rentalFee: {
        type: Number,
        min: 0
    }
}));


function validateRental(rental) {
    const schema = {
        customerId: Joi.string().required(),
        movieId: Joi.string().required()
    }
    return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;