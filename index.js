const mongoose = require('mongoose');
const express = require('express');


const customers = require('./routes/customers')
const catagories = require('./routes/catagories')



const app = express();

app.use(express.json());


app.use('/api/customers' , customers)
app.use('/api/catagories' , catagories)

mongoose.connect('mongodb://localhost/mongo-games')
    .then(() => console.log('Now connected to MongoDB!'))
    .catch(err => console.error('Something went wrong', err));


const port = 3000;
app.listen(port , ()=> {console.log('Connecting on port')});

