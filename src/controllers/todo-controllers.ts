import { Effect, Layer } from "effect";
import { TodoRepository } from "../repositories/todoRepository";
import { Todo } from "../models/todo.model";
import { del, get, post, put } from "../services/expressService";
import { v4 as uuidv4 } from "uuid";
import { UserRepository } from "../repositories/userRepository";

// GET /todos/:id
export const TodoByIdRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    yield* get("/users/:user_id/tasks", (req, res) =>
      Effect.gen(function* () {
        const user_id = req.params.user_id;
        const todo = yield* repo.getTodosByUserId(user_id);

        if (todo) {
          res.json(todo);
        } else {
          res.status(404).json({
            message: `Todo with id ${user_id} not found in the database.`,
            status: 404,
            success: false,
          });
        }
      })
    );
  })
);

// GET /todos/:user_id/tasks/:task_id
export const TodoByIdUserIdTask = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    yield* get("/users/:user_id/tasks/:task_id", (req, res) =>
      Effect.gen(function* () {
        const user_id = req.params.user_id;
        const task_id = req.params.task_id;
        const todo = yield* repo.getTodoByUserIdTaskId(user_id, task_id);

        if (todo) {
          res.json(todo);
        } else {
          res.status(404).json({
            message: `Todo with id ${task_id} not found in the database.`,
            status: 404,
            success: false,
          });
        }
      })
    );
  })
);

// POST /users/:user_id/tasks
export const CreateTodoRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    const userRepo = yield* UserRepository;
    yield* post("/users/:user_id/tasks", (req, res) =>
      Effect.gen(function* () {
        const user_id = req.params.user_id;
        const user = yield* userRepo.getUser(user_id);
        if (!user) {
          res.status(404).json({
            message: `User with id ${user_id} not found in the database.`,
            status: 404,
            success: false,
          });
          return;
        }

        const { title, description, status, dueDate, completed } =
          req.body as Todo;

        if (!title || !description || !status || !dueDate) {
          res.status(400).json({
            message: "Please provide all required fields.",
            status: 400,
            success: false,
          });
          return;
        }

        const todo: Todo = {
          id: uuidv4().split("-").join(""),
          title,
          description,
          status,
          dueDate,
          completed,
          user_id,
          user: user,
          createdAt: new Date(),
          updatedAt: new Date(),
        };

        yield* repo.createTodo(todo);
        return res.status(201).send(todo);
      })
    );
  })
);

// PUT /users/:user_id/tasks/:task_id
export const UpdateTodoRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    const userRepo = yield* UserRepository;
    yield* put("/users/:user_id/tasks/:task_id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.task_id;
        const updatedTodo = req.body as Partial<Todo>;
        const user_id = req.params.user_id;

        const user = yield* userRepo.getUser(user_id);
        if (!user) {
          res.status(404).json({
            message: `User with id ${user_id} not found in the database.`,
            status: 404,
            success: false,
          });
          return;
        }

        const todoExists = yield* repo.getTodoById(id);
        if (!todoExists) {
          res.status(404).json({
            message: `Todo with id ${id} not found.`,
            status: 404,
            success: false,
          });
          return;
        }

        yield* repo.updateTodo(id, updatedTodo);

        const todo = yield* repo.getTodosByUserId(user_id);

        res.status(200).json({
          message: `Todo with id ${id} has been updated successfully.`,
          status: 200,
          success: true,
          todo,
        });
      })
    );
  })
);

// DELETE /users/:user_id/tasks/:task_id
export const DeleteTodoRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    yield* del("/users/:user_id/tasks/:task_id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.task_id;

        if (!id) {
          res.status(400).json({
            message: "Please provide a valid task id.",
            status: 400,
            success: false,
          });
          return;
        }

        yield* repo.deleteTodo(id);
        res.status(200).send({
          message: `Todo with id ${id} has been deleted successfully.`,
          status: 204,
          success: true,
        });
      })
    );
  })
);

// GET /todos
export const IndexRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* TodoRepository;
    yield* get("/tasks", (_, res) =>
      Effect.gen(function* () {
        const todos = yield* repo.getTodos;
        res.json({ todos, message: "Hello World", status: 200, success: true });
      })
    );
  })
);

// Merge routes into a single layer
export const RouterTodoLive = Layer.mergeAll(
  IndexRouteLive,
  TodoByIdRouteLive,
  CreateTodoRouteLive,
  UpdateTodoRouteLive,
  DeleteTodoRouteLive,
  TodoByIdUserIdTask
);
