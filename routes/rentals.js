const express = require('express');
const router = express.Router();



const { Rental, validate } = require('../models/rental');
const { Customer } = require('../models/customer');
const { Book } = require('../models/book');

router.get('/', auth, async (req, res) => {
    const rentals = await Rental.find().sort('-dateOut');
    res.send(rentals);
  });



  router.get('/:id', async (req, res) => {
    const rental = await Rental.findById(req.params.id).exec();
  
    if (!rental)
      return res.status(404).send('The rental with the given ID was not found.');
  
    res.send(rental);
  });
  
  router.post('/', async (req, res) => {
    const {error} = validate(req.body)
    if (error) return res.status(404).send(error.detail[0].message);

    const customer = await Customer.findById(req.body.customerId).exec();
  if (!customer) return res.status(400).send('Invalid customer.');

  const book = await Book.findById(req.body.bookId).exec();
  if (!book) return res.status(400).send('Invalid book.');


  if (book.numberInStock === 0)
    return res.status(400).send('Book not in stock.');

  let rental = new Rental({
    customer: {
      _id: customer._id,
      name: customer.name,
      phone: customer.phone,
    },
    book: {
      _id: book._id,
      title: book.title,
      dailyRentalRate: book.dailyRentalRate,
    },
  });
  rental = await rental.save();

  })

  
  module.exports = router;