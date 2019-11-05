const express = require("express");
const db = require("../data/db-config");
console.log(process.env.NODE_ENV);
// not needed
// const knex = require('knex');

// const db = knex({
//   client: 'sqlite3',
//   connection: {
//     filename: './data/produce.db3'
//   },
//   useNullAsDefault: true
// });

const router = express.Router();

router.get("/", (req, res) => {
  db("cars")
    .then(cars => {
      res.json(cars);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve cars" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  db("cars")
    .where({ id })
    .first()
    .then(car => {
      res.json(car);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to retrieve car" });
    });
});

router.post("/", (req, res) => {
  const carData = req.body;
  db("cars")
    .insert(carData)
    .then(ids => {
      db("cars")
        .where({ id: ids[0] })
        .then(newCarEntry => {
          res.status(201).json(newCarEntry);
        });
    })
    .catch(err => {
      console.log("POST error", err);
      res.status(500).json({ message: "Failed to store data" });
    });
});

router.put("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .update({
      VIN: req.body.VIN,
      make: req.body.make,
      model: req.body.model,
      mileage: req.body.mileage
    })
    .then(affectedRecords => {
      console.log(affectedRecords);
      res.json(affectedRecords + " car records got changed!");
    })
    .catch(error => {
      res.status(500).json({
        message: "this went wrong: " + error.message
      });
    });
});

router.delete("/:id", (req, res) => {
  db("cars")
    .where({ id: req.params.id })
    .del()
    .then(affectedRecords => {
      res.json(affectedRecords + " rows got deleted!");
    })
    .catch(error => {
      res.status(500).json("this went wrong: " + error.message);
    });
});

module.exports = router;
