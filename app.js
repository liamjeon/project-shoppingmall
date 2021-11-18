import express from "express";
import path from "path";

const __dirname = path.resolve();
const app = express();

app.use(express.urlencoded({extended: true})) 

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/templates/index.html"));
});

app.get("/write", function (req, res) {
  res.sendFile(path.join(__dirname, "/templates/write.html"));
});

app.post("/add", function (req, res) {
  res.send("전송완료");
  console.log(req.body);
});

app.listen(8080);
