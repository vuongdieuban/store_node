const Joi = require("joi");
const mongoose = require("mongoose");
const moment = require("moment");


const rentalSchema = new mongoose.Schema({
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
        default: false
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
      dailyRentalRate: {
        type: Number,
        min: 0,
        max: 255,
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
    type: Date
  },

  rentalFee: {
    type: Number,
    min: 0
  }
})

/**lookup is a static method of Rental class
 * "this" keyword refers to the Rental class
 */
rentalSchema.statics.lookup = function (customerId, movieId){
  return this.findOne({
    "customer._id": customerId,
    "movie._id": movieId
  });
}

/**returns is an instance method, update dateReturned and calculate rentalFee
 * "this" keyword refers to the instance
 */
rentalSchema.methods.returns = function (){
  this.dateReturned = new Date();
  
  const rentalDays =  moment().diff(this.dateRented, "days");
  this.rentalFee = rentalDays * this.movie.dailyRentalRate;
}

const Rental = mongoose.model("Rental",rentalSchema);

function validateRental(rental) {
  const schema = {
    customerId: Joi.objectId().required(),
    movieId: Joi.objectId().required()
  };
  return Joi.validate(rental, schema);
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;
