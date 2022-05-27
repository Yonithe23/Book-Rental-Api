const mongoose = require('mongoose');
const Joi = require('joi');

const genreSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
    trim: true
  },
  description: {
    type: String,
    required: false,
    minlength: 10,
    maxlength: 250,
    trim: true
  }
});

const Catagory = mongoose.model('Catagory',genreSchema)

function validateGenre(genre) {
    const schema = {
      name: Joi.string()
        .min(3)
        .max(50)
        .required(),
      description: Joi.string()
    };
  
    return Joi.validate(genre, schema);
  }


module.exports = {
  Catagory : Catagory ,
  validate : validateGenre,
  schema: genreSchema
 }