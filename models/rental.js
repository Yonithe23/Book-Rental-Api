const mongoose = require('mongoose');
const Joi = require('joi')

const rentalSchema = new mongoose.Schema({
    customer: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 50
        },
        email: {
          type: String,
          required: true,
          trim: true,
          minlength: 5,
          maxlength: 255
        }
      }),
      required: true
    },
    book: {
      type: new mongoose.Schema({
        name: {
          type: String,
          required: true,
          trim: true,
          minlength: 1,
          maxlength: 50
        },
        dailyRentalRate: {
          type: Number,
          required: true,
          min: 0,
          max: 255
        }
      }),
      required: true
    },
    dateOut: {
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
  });

  const Rental = mongoose.model("Rental", rentalSchema);

function validateRental(rental) {
    const schema = {

      bookId: Joi.objectId().required(),
      customerId: Joi.objectId().required
    };
  
    return Joi.validate(rental, schema);
  }
  
  exports.Rental = Rental;
  exports.validate = validateRental;