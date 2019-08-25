const express = require("express");

const carsRouter = require("../cars/cars-router.js");

const server = express();

server.use(express.json());

server.use("/api/cars", carsRouter);

server.get("/", (req, res) => {
  res.send("<h3>WebDB-ii-challenge</h3>");
});

module.exports = server;