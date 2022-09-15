const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  res.status(200).send("Home page");
});

app.get("/about", (req, res, next) => {
  res.status(200).send("About page");
});

app.all("*", (req, res, next) => {
  res.status(404).send("<h1>Error 404.<br /> Page not found.</h1>");
});

app.listen(5000, () => {
  console.log("Server is listening on port 5000");
});
