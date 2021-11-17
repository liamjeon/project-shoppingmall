import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/templates/index.html"));
});

app.get("/write", function (req, res) {
    console.log(res);
  res.sendFile(path.join(__dirname, "/templates/write.html"));
});

app.listen(8080);
