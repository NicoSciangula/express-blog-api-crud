const post = require("./../data/posts");

function index(req, res) {
  const postList = {
    "Numero dei post": post.length,
    "Lista dei Post": post,
  };

  let filteredPost = postList;
  if (req.query.tags) {
    filteredPost = post.filter((singlePost) => {
      return singlePost.tags.includes(req.query.tags);
    });
  }
  res.json(filteredPost);
}

function show(req, res) {
  const postId = parseInt(req.params.id);
  const singlePost = post.find((element) => {
    return element.id === postId;
  });

  if (!singlePost) {
    res.status(404);

    return res.json({
      status: 404,
      error: "Not found",
      message: "Post non trovata",
    });
  }

  res.json(singlePost);
}

function store(req, res) {
  console.log(req.body);
  // res.send("Creazione nuovo Post");
  const newId = Date.now();

  const newPost = {
    id: newId,
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
  };

  post.push(newPost);

  console.log(post);

  res.status(201);
  res.json(newPost);
}

function update(req, res) {
  // res.send(`Modifica integrale del Post ${req.params.id}`);
  const id = parseInt(req.params.id);
  const updatePost = post.find((e) => e.id === id);

  if (!updatePost) {
    res.status(404);
    return res.json({
      error: 404,
      message: "Post non trovato",
    });
  }

  updatePost.title = req.body.title;
  updatePost.content = req.body.content;
  updatePost.tags = req.body.tags;

  console.log(post);
  res.json(updatePost);
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
      message: "Post non trovata",
    });
  }

  post.splice(post.indexOf(deletePost), 1);

  res.sendStatus(204);
  console.log(post);
}

module.exports = {index, show, store, update, destroy};
