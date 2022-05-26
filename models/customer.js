const mongoose = require('mongoose');
const Joi = require('joi');

const Customer = mongoose.model('Customer' , new mongoose.Schema({
    isGold: {
        type: Boolean,
        default: false
      },
      name: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 100,
        trim: true
      },
      phone: {
        type: String,
        validate: /^\d{6,16}$/
      }  
}))
function validateCustomer(customer) {
  const schema = {
    name: Joi.string()
      .min(3)
      .required(),
    phone: Joi.string().min(5).max(50).required,
    isGold: Joi.boolean()
  };

  return Joi.validate(customer, schema);
}

module.exports = {
  Customer : Customer,
  validate : validateCustomer};