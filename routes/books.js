const express = require('express');
const router = express.Router();

const {Book , validate} = require('../models/book')
const {Catagory} = require('../models/catagory')

router.get('/', async (req, res) => {
    const book = await Book.find()
    res.send(book);
})

router.post('/', async (req, res) =>{
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.detail[0].message);

    const catagory = await Catagory.findById(req.body.catagoryId);
    if (!catagory) return res.status(400).send(catagoryIdError);

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

router.put('/:id', async (req, res) =>{
  //validate 
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.detail[0].message);

    const catagory = await Catagory.findById(req.body.catagoryId);
    if (!catagory) return res.status(400).send(catagoryIdError);

    const book = await Book.findByIdAndUpdate(
        req.params.id,
        {
          title: req.body.title,
          numberInStock: req.body.numberInStock,
          dailyRentalRate: req.body.dailyRentalRate,
          catagory: {
            _id : catagory._id,
            name: catagory.name
          },
        },
        { new: true }
    )  
  if (!book) return res.status(404).send(`no such id: ${req.params.id} found`);

  res.send(book);  

})

router.delete('/:id', async (req, res) =>{
  const book = await Book.findByIdAndUpdate(req.params.id)
  if (!book) return res.status(404).send(`no such id: ${req.params.id} found`);
  res.send(book);
  
})