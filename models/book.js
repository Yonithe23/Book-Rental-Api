const mongoose = require('mongoose');
const Joi = require('joi');
const { schema } = require('./catagory')

const Book = mongoose.model('Book' , new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
      },
      catagory: {
        type: schema,
        required: true
      },
      numberInStock: {
        type: Number,
        default: 0
      },
      dailyRentalRate: {
        type: Number,
        default: 0
      }
}));

function validateBook(book) {
    const schema = {
      title: Joi.string()
        .min(5)
        .max(50)
        .required(),
      genreId: Joi.objectId().required(),
      numberInStock: Joi.number()
        .min(0)
        .required(),
      dailyRentalRate: Joi.number()
        .min(0)
        .required()
    };
    return Joi.validate(book, schema);
}

module.exports = {
    Book : Book ,
    validate : validateBook 
}