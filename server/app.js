require("dotenv").config();
require("./models/db")

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3001;

const UserController = require("./controllers/User");

app.use(cors());

app.use(express.static("public"));

app.use(express.json());

app.get("/users", UserController.list);
app.get("/users/:id", UserController.getById);

app.use("*", (req, res) => {
    res.status(404).json({
      message: "404 Not Found",
    });
  });
  
  app.use((err, req, res, next) => {
    const { statusCode = 500, message } = err;
    console.log({ err });
    res.status(statusCode).send({
      message: statusCode === 500 ? "На сервере произошла ошибка" : message,
    });
  });
  
  app.listen(PORT, () => {
    console.log(`Server app listening at http://localhost:${PORT}`);
  });