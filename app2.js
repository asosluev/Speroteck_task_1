const mysql = require("mysql2");
const express = require("express");

const app = express();
const urlencodedParser = express.urlencoded({ extended: false });

const host = "127.0.0.1";
const port = 3000;

const pool = mysql.createPool({
  connectionLimit: 5,
  host: "localhost",
  user: "root",
  database: "test_1",
  password: "123456",
});

app.set("view engine", "hbs");

// получение списка пользователей
app.get("/create", function (req, res) {
  pool.query("SELECT * FROM users", function (err, data) {
    if (err) return console.log(err);
    res.render("create.hbs", {
      users: data,
    });
  });
});

// возвращаем форму для добавления данных
app.get("/", function (req, res) {
  res.render("task.hbs");
});
app.get("/index", function (req, res) {
  res.render("index.hbs");
});

app.post("/", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const surname = req.body.surname;
  const age = req.body.age;

  if (age > 18) {
    console.log(`Hello  ${name} ${surname}`);
  }
});
/*
app.get("/true", function (req, res) {
  res.render("true.hbs");
});
*/
// получаем отправленные данные и добавляем их в БД
app.post("/index", urlencodedParser, function (req, res) {
  if (!req.body) return res.sendStatus(400);
  const name = req.body.name;
  const surname = req.body.surname;
  const age = req.body.age;
  const email = req.body.email;
  const serchEmail = req.body.serchEmail;

  if (age > 18) {
    pool.query(
      "INSERT INTO users (name,surname, email) VALUES (?,?,?)",
      [name, surname, email],
      function (err, data) {
        if (err) return console.log(err);
        console.log("True");
      }
    );
  }

  pool.query(
    `SELECT * FROM users WHERE email=?`,
    [serchEmail],
    function (err, results) {
      if (err) console.log(err);
      console.log(results);
    }
  );
});

app.listen(port, host, function () {
  console.log(`server start... http://${host}:${port}`);
});
