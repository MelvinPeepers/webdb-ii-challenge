const express = require("express");

const CarsRouter = require("./cars/car-router.js");

const server = express();

server.use(express.json());

server.use("/api/cars", CarsRouter);

server.get("/", (req, res) => {
  res.send("<h3>WebDB-ii-challenge</h3>");
});

module.exports = server;