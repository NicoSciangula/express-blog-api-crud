const {error} = require("node:console");
const post = require("./../data/posts");

function index(req, res) {
  const postList = {
    "Numero dei post": post.length,
    "Lista dei Post": post,
  };
  res.json(postList);
}

function show(req, res) {
  const postId = parseInt(req.params.id);
  const singlePost = post.find((element) => {
    return element.id === postId;
  });

  res.json(singlePost);
}

function store(req, res) {
  res.send("Creazione nuovo Post");
}

function update(req, res) {
  res.send(`Modifica integrale del Post ${req.params.id}`);
}

function destroy(req, res) {
  const postId = parseInt(req.params.id);
  const deletePost = post.find((element) => {
    return element.id === postId;
  });

  if (!deletePost) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not found",
      message: "Pizza non trovata",
    });
  }

  post.splice(post.indexOf(deletePost), 1);

  res.sendStatus(204);
  console.log(post);
}

module.exports = {index, show, store, update, destroy};
