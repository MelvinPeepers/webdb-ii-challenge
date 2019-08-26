const express = require("express");

const db = require("../data/dbConfig.js")

const router = express.Router();

  router.get("/", (req, res) => {
    // SELECT * FROM Cars
    //   db("accounts")
    db.select("*")
      .from("cars")
      .then(cars => {
        res.json(cars);
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to get cars" });
      });
  });
  // http://localhost:5000/api/cars
  // tested with Postman
  
  router.get("/:id", (req, res) => {
    // SELECT * FROM carss WHERE ID = req.param.id
    const { id } = req.params;
    
    db("cars")
      .where({ id })
      .then(cars => {
        const car = cars[0];
  
        if (car) {
          res.json(car);
        } else {
          res.status(400).json({ message: "invalid car id" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to get car" });
      });
  });
  // http://localhost:5000/api/cars/3
  // tested with Postman
  
  router.post("/", (req, res) => {
    // INSERT INTO cars (all of the keys from req.body) VALUES (all of the values from req.body)
    const carData = req.body;
    db("cars")
      .insert(carData)
      .then(ids => {
        res.status(201).json({ newCar: ids[0] });
      })
      .catch(error => {
        console.log("post error", error);
        res.status(500).json({ message: "Failed to insert car" });
      });
  });
    // http://localhost:5000/api/cars
  // tested with Postman
  
  router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body;
  
    // UPDATE Cars SET changes.key = changes.value, changes.key = value WHERE id = id;
    db('cars').where({ id }).update(changes)
    .then(count => {
      if (count) {
        res.json({ updated: count });
      } else {
        res.status(404).json({ message: 'invalid car id' });
      }
    })
    .catch(error => {
      res.status(500).json({ message: 'Failed to update car'});
    });
  });
  // http://localhost:5000/api/cars/4
  // tested with Postman
  
  router.delete("/:id", (req, res) => {
    // DELETE FROM Cars WHERE id = id;
    const { id } = req.params;
  
    db("cars")
      .where({ id })
      .del()
      .then(count => {
        if (count) {
          res.json({ deleted: count });
        } else {
          res.status(404).json({ message: "invalid car id" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to delete car" });
      });
  });
    // tested with Postman
  
module.exports = router;