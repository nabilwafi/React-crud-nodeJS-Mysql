require("dotenv").config();
const path = require("path");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mysql = require("mysql");
const cors = require("cors");

const PORT = process.env.PORT || 8888;

const db = mysql.createPool({
  host: process.env.HOST,
  user: process.env.USER,
  password: process.env.PASSWORD,
  database: process.env.DATABASE,
});

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/api/get", (req, res) => {
  const sql_select = "SELECT * FROM movie_reviews";

  db.query(sql_select, (err, result) => {
    try {
      res.send(result);
    } catch (err) {
      console.log(err);
    }
  });
});

app.post("/api/insert", (req, res) => {
  const movieName = req.body.movieName;
  const movieReview = req.body.movieReview;

  const sql_insert =
    "INSERT INTO movie_reviews (movie_name, movie_review) VALUES (?,?)";
  db.query(sql_insert, [movieName, movieReview], (err, result) => {
    console.log(err);
  });
});

app.delete("/api/delete/:id", (req, res) => {
  const id = req.params.id;

  const sql_delete = "DELETE FROM movie_reviews WHERE id=?";

  db.query(sql_delete, id, (err, result) => {
    if (err) console.log(err);
  });
});

app.put("/api/update/:movieName", (req, res) => {
  const name = req.body.movieName;
  const review = req.body.movieReview;

  const sql_update =
    "UPDATE movie_reviews SET movie_review=? WHERE movie_name=?";

  db.query(sql_update, [review, name], (err, result) => {
    if (err) console.log(err);
  });
});

app.listen(PORT, () => console.log(`Running on port ${PORT}`));
