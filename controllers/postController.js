const post = require("./../data/posts");

function index(req, res) {
  res.send("Lista Post");
}

function show(req, res) {
  res.send(`Dettagli del Post ${req.params.id}`);
}

function store(req, res) {
  res.send("Creazione nuovo Post");
}

function update(req, res) {
  res.send(`Modifica integrale del Post ${req.params.id}`);
}

function destroy(req, res) {
  res.send(`Eliminazione del Post ${req.params.id}`);
}

module.exports = {index, show, store, update, destroy};
