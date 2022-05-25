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
function validateUser(customer) {
    const schema = {
        name: Joi.string().min(5).max(50).required(),
        email: Joi.string().min(5).max(255).required().email(),
        password: Joi.string().min(5).max(255).required()
    };
    return Joi.validate(customer, schema);
}

module.exports = {
  Customer : Customer,
  validate : validateUser};