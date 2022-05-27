const express = require('express');
const router = express.Router();

const {Book , validate} = require('../models/book')

router.get('/', async (req, res) => {
    const book = await Book.find()
    res.send(book);
})

router.post('/', async (req, res) =>{
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.detail[0].message);

    let book = new Book({
        title: req.body.title ,
        catagory: {
            _id : catagory._id,
            name: catagory.name
          },
          numberInStock: req.body.numberInStock,
          dailyRentalRate:req.body.dailyRentalRate

    })
    book = await book.save()
    res.send(book);


})

router.put('/', async (req, res) =>{})

router.delete('/', async (req, res) =>{})