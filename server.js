const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");
const PORT = process.env.PORT || 5000;

app.use(express.static("public"));

// app.use(express.static("API"))

app.get("/", (request, response) => {
  response.sendFile(path.resolve("./public/index.html"))
})

app.get("/about", (request, response) => {
  response.sendFile(path.resolve("./public/about.html"));
});

app.get("./api/:data", (req, res) => {
  res.send(req.params.data);
});

app.get("*", (request, response) => {
  response.status(404);
  response.sendFile(path.resolve("./public/404/html"));
});

app.listen(PORT, () => {
  console.log(`Running on port: ${PORT}`);
});
