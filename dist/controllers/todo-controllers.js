"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterTodoLive = exports.IndexRouteLive = exports.DeleteTodoRouteLive = exports.UpdateTodoRouteLive = exports.CreateTodoRouteLive = exports.TodoByIdUserIdTask = exports.TodoByIdRouteLive = void 0;
const effect_1 = require("effect");
const todoRepository_1 = require("../repositories/todoRepository");
const expressService_1 = require("../services/expressService");
const uuid_1 = require("uuid");
const userRepository_1 = require("../repositories/userRepository");
// GET /todos/:id
exports.TodoByIdRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* todoRepository_1.TodoRepository;
    yield* (0, expressService_1.get)("/users/:user_id/tasks", (req, res) => effect_1.Effect.gen(function* () {
        const user_id = req.params.user_id;
        const todo = yield* repo.getTodosByUserId(user_id);
        if (todo) {
            res.json(todo);
        }
        else {
            res.status(404).json({
                message: `Todo with id ${user_id} not found in the database.`,
                status: 404,
                success: false,
            });
        }
    }));
}));
// GET /todos/:user_id/tasks/:task_id
exports.TodoByIdUserIdTask = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* todoRepository_1.TodoRepository;
    yield* (0, expressService_1.get)("/users/:user_id/tasks/:task_id", (req, res) => effect_1.Effect.gen(function* () {
        const user_id = req.params.user_id;
        const task_id = req.params.task_id;
        const todo = yield* repo.getTodoByUserIdTaskId(user_id, task_id);
        if (todo) {
            res.json(todo);
        }
        else {
            res.status(404).json({
                message: `Todo with id ${task_id} not found in the database.`,
                status: 404,
                success: false,
            });
        }
    }));
}));
// POST /users/:user_id/tasks
exports.CreateTodoRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* todoRepository_1.TodoRepository;
    const userRepo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.post)("/users/:user_id/tasks", (req, res) => effect_1.Effect.gen(function* () {
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
        const { title, description, status, dueDate, completed } = req.body;
        if (!title || !description || !status || !dueDate) {
            res.status(400).json({
                message: "Please provide all required fields.",
                status: 400,
                success: false,
            });
            return;
        }
        const todo = {
            id: (0, uuid_1.v4)().split("-").join(""),
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
    }));
}));
// PUT /users/:user_id/tasks/:task_id
exports.UpdateTodoRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* todoRepository_1.TodoRepository;
    const userRepo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.put)("/users/:user_id/tasks/:task_id", (req, res) => effect_1.Effect.gen(function* () {
        const id = req.params.task_id;
        const updatedTodo = req.body;
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
    }));
}));
// DELETE /users/:user_id/tasks/:task_id
exports.DeleteTodoRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* todoRepository_1.TodoRepository;
    yield* (0, expressService_1.del)("/users/:user_id/tasks/:task_id", (req, res) => effect_1.Effect.gen(function* () {
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
    }));
}));
// GET /todos
exports.IndexRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* todoRepository_1.TodoRepository;
    yield* (0, expressService_1.get)("/tasks", (_, res) => effect_1.Effect.gen(function* () {
        const todos = yield* repo.getTodos;
        res.json({ todos, message: "Hello World", status: 200, success: true });
    }));
}));
// Merge routes into a single layer
exports.RouterTodoLive = effect_1.Layer.mergeAll(exports.IndexRouteLive, exports.TodoByIdRouteLive, exports.CreateTodoRouteLive, exports.UpdateTodoRouteLive, exports.DeleteTodoRouteLive, exports.TodoByIdUserIdTask);
