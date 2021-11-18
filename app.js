const express = require("express");
const path = require("path");
const MongoClient = require("mongodb").MongoClient;
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");

var db;
MongoClient.connect(
  "mongodb+srv://LiamJeon:roejddl1@cluster0.xauoo.mongodb.net/shopping-app?retryWrites=true&w=majority",
  function (error, client) {
    if (error) return console.log(error);
    db = client.db("shopping-app");
    app.listen(8080, () => console.log("listening on 8080"));
  }
);

app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/index.html"));
});

app.get("/list", function (req, res) {
  db.collection("post")
    .find()
    .toArray(function (error, result) {
      console.log(result);
      res.render("list.ejs", { posts: result });
    });
});

app.get("/write", function (req, res) {
  res.sendFile(path.join(__dirname, "/views/write.html"));
});

app.post("/add", function (req, res) {
  res.send("전송완료");
  db.collection('counter').findOne({name: '게시물개수'}, (err, result)=>{
      const 총게시물개수 = result.totalPost;

      db.collection("post").insertOne({ _id:총게시물개수, title:req.body.title, date:req.body.date}, (err, result)=>{
        console.log("저장완료");
        db.collection('counter').updateOne({name: '게시물개수'}, { $inc : {totalPost:1}}, (err, result)=>{ //operator 사용
            if(err) return console.error(err);
        })
      });
  });
});

app.delete('/delete', (req, res)=>{
    console.log(req.body._id);

    req.body._id = parseInt(req.body._id);
    db.collection('post').deleteOne({_id: req.body._id}, (err, result)=>{
        console.log('삭제완료');
        res.status(200).send('삭제를 완료했습니다.');
    })
})