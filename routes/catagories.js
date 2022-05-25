const express = require('express');
const router = express.Router()

const catagory = require('../models/catagory')
router.get('/', (req, res) => {
    res.send("Hello world");
});

router.post('/', (req, res) => {})

router.put('/', (req, res) => {})

router.delete('/', (req, res) =>{})

module.exports = router;