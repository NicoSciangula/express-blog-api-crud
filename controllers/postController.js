// const post = require("./../data/posts");

const connection = require("./../data/db");

// * INDEX
function index(req, res) {
  const sql = "SELECT * FROM posts";

  connection.query(sql, (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.json(results);
  });
}

// * SHOW
function show(req, res) {
  const { id } = req.params;

  const postsSql = "SELECT * FROM posts WHERE id = ?";

  const tagsSql = `
SELECT T.*
FROM tags T
JOIN post_tag PT ON T.id = PT.tag_id
WHERE PT.post_id = ? `;

  connection.query(postsSql, [id], (err, postResults) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    if (postResults.length === 0)
      return res.status(404).json({ error: "Post not found" });

    const post = postResults[0];

    connection.query(tagsSql, [id], (err, tagResults) => {
      if (err) return res.status(500).json({ error: "Database query failed" });

      post.tags = tagResults;
      res.json(post);
    });
  });
}

// * STORE
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

// * UPDATE
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

// * DESTROY
function destroy(req, res) {
  const { id } = req.params;

  const sql = "DELETE FROM posts WHERE id = ?";

  connection.query(sql, [id], (err, results) => {
    if (err) return res.status(500).json({ error: "Database query failed" });
    res.sendStatus(204);
  });
}

module.exports = { index, show, store, update, destroy };
