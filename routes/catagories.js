const express = require('express');
const router = express.Router()

const {Catagory , validate} = require('../models/catagory')

router.get('/', async (req, res) => {
    const result= await Catagory.find()
    res.send(result);
});

router.post('/', async (req, res) => {
    const {error}= validate(req.body);
    if (error) return res.status(404).send(error.detail[0].message);
    let catagory = new Catagory({
        name: req.body.name,
        description: req.body.description
    })
    catagory = await catagory.save()
    res.send(catagory)
})

router.put('/:id', async(req, res) => {
    const {error}= validate(req.body);
    if (error) return res.status(404).send(error.detail[0].message);
    const catagory = await Catagory.findByIdAndUpdate(req.params.id,{name: req.body.name }, {new: true})
    if (!catagory) return res.status(404).send('The catagory with the given ID was not found.');
    res.send(catagory);
})

router.delete('/:id', async(req, res) =>{
    const catagory =  await Catagory.findByIdAndRemove(req.params.id)
    if (!catagory) return res.status(404).send('The catagory with the given ID was not found.')
    res.send(catagory);
    })

module.exports = router;