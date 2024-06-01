const express = require("express");
const { Todo } = require("../mongo");
const router = express.Router();

const redis = require("../redis");

/* GET todos listing. */
router.get("/", async (_, res) => {
  const todos = await Todo.find({});
  res.send(todos);
});

/* POST todo to listing. */
router.post("/", async (req, res) => {
  await redis.setAsync(
    "addedTodos",
    Number(await redis.getAsync("addedTodos")) + 1
  );

  const todo = await Todo.create({
    text: req.body.text,
    done: false,
  });
  res.send(todo);
});

const singleRouter = express.Router();

const findByIdMiddleware = async (req, res, next) => {
  const { id } = req.params;
  req.todo = await Todo.findById(id);
  if (!req.todo) return res.sendStatus(404);

  next();
};

/* DELETE todo. */
singleRouter.delete("/", async (req, res) => {
  await req.todo.delete();
  res.sendStatus(200);
});

/* GET todo. */
singleRouter.get("/", async (req, res) => {
  if (req.todo) res.send(req.todo);
  else res.status(404);
});

/* PUT todo. */
singleRouter.put("/", async (req, res) => {
  const todo = await Todo.findByIdAndUpdate(req.todo._id, {
    text: req.body.text,
    done: req.body.done,
  });

  if (todo) res.send(todo);
  else res.status(404);
});

router.use("/:id", findByIdMiddleware, singleRouter);

module.exports = router;
