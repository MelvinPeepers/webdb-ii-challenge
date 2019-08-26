const express = require("express");

const db = require("../data/dbConfig.js")

const router = express.Router();

// router.get("/", (req, res) => {
//     db("cars")
//       .then(cars => {
//         res.json(cars);
//       })
//       .catch(error => {
//         res.status(500).json({ message: "Failed to retrieve cars" });
//       });
//   });
  
//   router.get("/:id", (req, res) => {
//     const { id } = req.params;
  
//     db("cars")
//       .where({ id })
//       .first()
//       .then(car => {
//         res.json(car);
//       })
//       .catch(error => {
//         res.status(500).json({ message: "Failed to retrieve car" });
//       });
//   });
  
//   router.post("/", (req, res) => {
//     const fruitData = req.body;
//     db("cars")
//       .insert(carData)
//       .then(ids => {
//         db("cars")
//           .where({ id: ids[0] })
//           .then(newCarEntry => {
//             res.status(201).json(newCarEntry);
//           });
//       })
//       .catch(error => {
//         console.log("POST error", error);
//         res.status(500).json({ message: "Failed to store data" });
//       });
//   });


  router.get("/", (req, res) => {
    // SELECT * FROM Posts
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
  
  router.get("/:id", (req, res) => {
    // SELECT * FROM Posts WHERE ID = param.id
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
  
  router.post("/", (req, res) => {
    // INSERT INTO Posts (all of the keys from req.body) VALUES (all of the values from req.body)
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
  
  router.put("/:id", (req, res) => {
    const { id } = req.params;
    const changes = req.body;
    // UPDATE  Posts SET changes.key = changes.value, changes.key = WHERE 9d = id;
    db("cars")
      .where({ id })
      .update(changes)
      .then(count => {
        if (count) {
          res.status(200).json({ updated: count });
        } else {
          res.status(404).json({ message: "invalid car id" });
        }
      })
      .catch(error => {
        res.status(500).json({ message: "Failed to update car" });
      });
  });
  
  router.delete("/:id", (req, res) => {
    // DELETE FROM Posts WHERE id = id;
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
  
module.exports = router;