const express = require('express');
const app = express();
const logger = require('./logger');
const authorize = require('./authorize');

//app.use([logger, authorize]); definindo middleware para todas as rotas

app.get('/', (req, res)=>{
    res.send('Home Page');
});

app.get('/about', (req, res)=>{
    res.send('About Page');
});

app.get('/api/products', (req, res)=>{
    res.json({message: "Hi"});
})

app.get('/api/items', [logger, authorize], (req, res)=>{
    console.log(req.user)
    res.json({message: "Hello"});
})

app.listen(5000, () => {
    console.log("Server running on port 5000.");
});