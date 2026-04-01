const express = require("express");
const router = express.Router();

// * Index

router.get("/", (req, res) => {
  res.send("Lista Post");
});

// * Show
router.get("/:id", (req, res) => {
  res.send(`Dettagli del Post ${req.params.id}`);
});

// * Store
router.post("/", (req, res) => {
  res.send("Creazione nuovo Post");
});

// * Update
router.put("/:id", (req, res) => {
  res.send(`Modifica integrale del Post ${req.params.id}`);
});

// * Destroy
router.delete("/:id", (req, res) => {
  res.send(`Eliminazione del Post ${req.params.id}`);
});

module.exports = router;
