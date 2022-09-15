const express = require('express');
const app = express();
const logger = require('./logger');

app.use(logger);

app.get('/', (req, res)=>{
    res.send('Home Page');
});

app.get('/about', (req, res)=>{
    res.send('About Page');
});

app.get('/api/products', (req, res)=>{
    res.json({message: "Hi"});
})

app.get('/api/items', (req, res)=>{
    res.json({message: "Hello"});
})

app.listen(5000, () => {
    console.log("Server running on port 5000.");
});