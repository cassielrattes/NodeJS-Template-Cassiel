//* FRAMEWORK *\\
const routers = require("express").Router();
const jwt = require("jsonwebtoken");

//* HELPERS *\\
const dbUtils = require("../helpers/dbUtils");
const Utils = require("../helpers/utils");

//* MODELS *\\
const User = require("../models/user");
const UserDAO = require("../models/userDAO");

//* SECRET *\\
const secret = "MySecretToken";

//* VERIFY USER *\\
routers.post("/auth", (req, res) => {
  const user = new User(req.body);
  new UserDAO().verifyUser(user, (answer) => {
    if (answer.length > 0) {
      const token = jwt.sign(
        {
          id: Utils.encrypt(`${answer[0].id}`),
          username: answer[0].username,
          //   nivel: answer[0].admin
        },
        secret,
        { expiresIn: "1h" }
      );
      res.cookie("token", token);
      res.json(token);
    } else {
      res.status(301);
    }
  });
});

routers.get("/", (req, res) => {
  dbUtils.read(User.table, (users) => {
    res.json(users);
  });
});

routers.post("/", (req, res) => {
  const user = new User(req.body);
  user.password = user.password || "admin";
  user.encryptPassword(user.password);
  dbUtils.create(user, User.table, (r) => {
    res.json(r);
  });
});

routers.put("/:id", (req, res) => {
  const user = new User(req.body);
  user.encryptPassword(req.body.password);
  dbUtils.update(user, User.table, { key: "id", value: req.params.id }, (r) => {
    res.json(r);
  });
});

routers.delete("/:id", (req, res) => {
  dbUtils.delete(User.table, { key: "id", value: req.params.id }, (r) => {
    res.json(r);
  });
});

module.exports = routers;
