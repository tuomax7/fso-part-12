const express = require("express");
const router = express.Router();

const redis = require("../redis");

const configs = require("../util/config");

let visits = 0;

/* GET index data. */
router.get("/", async (req, res) => {
  visits++;

  res.send({
    ...configs,
    visits,
  });
});

/* GET statistics data. */
router.get("/statistics", async (req, res) => {
  if (!(await redis.getAsync("addedTodos"))) {
    await redis.setAsync("addedTodos", 0);
  }

  const addedTodos = await redis.getAsync("addedTodos");

  res.send({
    addedTodos: Number(addedTodos),
  });
});

module.exports = router;
