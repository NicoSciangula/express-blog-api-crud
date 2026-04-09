const express = require("express");
const app = express();
const port = 3000;
const postRouter = require("./routers/postRouter");

app.use(express.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Benvenuto nel mio Blog");
});

app.listen(port, () => {
  console.log("Il mio Blog!");
});
