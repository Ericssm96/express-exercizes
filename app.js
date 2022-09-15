const express = require('express');
const app = express();

const logger = (req, res, next) => {
    method = req.method;
    url = req.url;
    time = new Date().getFullYear();

    console.log(method, url, time);
    next();
}

app.get('/', logger, (req, res)=>{
    res.send('Home Page');
});

app.get('/about', (req, res)=>{
    res.send('About Page');
});

app.listen(5000, () => {
    console.log("Server running on port 5000.");
});