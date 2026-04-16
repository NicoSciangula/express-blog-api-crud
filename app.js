const express = require("express");
const app = express();
const port = 3000;
const postRouter = require("./routers/postRouter");

// * Middleware custom per errori
const errorsHandler = require("./middleware/errorsHandler");
const notFound = require("./middleware/notFound");

app.use(express.json());

app.use("/posts", postRouter);

app.get("/", (req, res) => {
  res.send("Benvenuto nel mio Blog");
});

app.use(errorsHandler);

app.use(notFound);

app.listen(port, () => {
  console.log("Il mio Blog!");
});
