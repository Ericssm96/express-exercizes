const express = require('express');
const app = express();
const {products} = require('./data.js');

app.get('/', (req, res) => {
    res.send(`
        <h1>Home Page</h1>
        <a href="/api/products">Products</a>
    `);
});

app.get('/api/products', (req, res)=>{
    const newProducts = products.map(product => {
        const {id, name, image, price} = product;
        return {id, name, image, price};
    })
    res.json(newProducts);
});

app.get('/api/products/:productID', (req, res)=>{
    console.log(req.params);
    const singleProduct = products.find(product => {
        return product.id === Number(req.params['productID']);
    })
    if(!singleProduct){
        return res.status(404).send(`<h1>Product does not exist</h1>`);
    }
    res.json(singleProduct);
});

app.get('/api/v1/query', (req, res)=>{
    console.log(req.query);
    const {search, limit} = req.query;
    let sortedProducts = [...products];

    if(search){ // Se existir o parâmetro Search, vai buscar todos os produtos cujos nomes possuem a letra indicada.
        sortedProducts = sortedProducts.filter(product => {
            return product.name.includes(search);
        })
    }

    if(limit){ // Se um limite for definido, vai mostrar apenas os x primeiros produtos (sendo x a quantidade inserida no parâmetro limit)
        sortedProducts = sortedProducts.slice(0, Number(limit));
    }

    if(sortedProducts.length < 1){
        // res.status(200).send("No products match the specified filter.");
        return res.status(200).json({success: true, data: []}) // É necessário fazer o return, pois caso não façamos, o código dessa função
        // continuará sendo executado, o que causará um erro no servidor, pois não se pode mandar duas respostas para a mesma requisição
    }

    res.status(200).json(sortedProducts); // Retorna os dados. Se nenhum parâmetro for definido, retorna todos os dados.
})

app.listen(5000, () => {
    console.log("Server running on port 5000.");
})