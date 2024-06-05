"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RouterUserLive = exports.GetUserByEmailRouteLive = exports.GetUserByNameRouteLive = exports.DeleteUserRouteLive = exports.UpdateUserRouteLive = exports.GetUserByIdRouteLive = exports.GetUserRouteLive = exports.CreateUserRouteLive = void 0;
const effect_1 = require("effect");
const userRepository_1 = require("../repositories/userRepository");
const expressService_1 = require("../services/expressService");
const uuid_1 = require("uuid");
const valid_1 = require("../utils/valid");
// POST /users
exports.CreateUserRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.post)("/user", (req, res) => effect_1.Effect.gen(function* () {
        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            res.status(400).send({ error: "Name, email, status are required." });
            return;
        }
        if (!(0, valid_1.isValidEmail)(email)) {
            res.status(400).send({
                error: "Invalid email format.",
                success: false,
                status: 400,
            });
            return;
        }
        const user = {
            id: (0, uuid_1.v4)().split("-").join(""),
            name,
            email,
            active: true,
            password,
        };
        yield* repo.createUser(user);
        res.status(201).send(user);
    }));
}));
// GET /users
exports.GetUserRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.get)("/users", (_, res) => effect_1.Effect.gen(function* () {
        const users = yield* repo.getUsers;
        res.json({ users, message: "Hello World", status: 200, success: true });
    }));
}));
// GET /users/:id
exports.GetUserByIdRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.get)("/user/:id", (req, res) => effect_1.Effect.gen(function* () {
        const id = req.params.id;
        const user = yield* repo.getUser(id);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send();
        }
    }));
}));
// PUT /users/:id
exports.UpdateUserRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.post)("/user/:id", (req, res) => effect_1.Effect.gen(function* () {
        const id = req.params.id;
        const updatedUser = req.body;
        yield* repo.updateUser(id, updatedUser);
        res.status(204).send();
    }));
}));
// DELETE /users/:id
exports.DeleteUserRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.post)("/user/:id", (req, res) => effect_1.Effect.gen(function* () {
        const id = req.params.id;
        yield* repo.deleteUser(id);
        res.status(204).send();
    }));
}));
// GET /users/name/:name
exports.GetUserByNameRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.get)("/user/name/:name", (req, res) => effect_1.Effect.gen(function* () {
        const name = req.params.name;
        const user = yield* repo.findUserByName(name);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send();
        }
    }));
}));
// GET /user/email/:email
exports.GetUserByEmailRouteLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const repo = yield* userRepository_1.UserRepository;
    yield* (0, expressService_1.get)("/user/email/:email", (req, res) => effect_1.Effect.gen(function* () {
        const email = req.params.email;
        const user = yield* repo.findUserByEmail(email);
        if (user) {
            res.json(user);
        }
        else {
            res.status(404).send();
        }
    }));
}));
exports.RouterUserLive = effect_1.Layer.mergeAll(exports.CreateUserRouteLive, exports.GetUserRouteLive, exports.GetUserByIdRouteLive, exports.UpdateUserRouteLive, exports.DeleteUserRouteLive, exports.GetUserByNameRouteLive, exports.GetUserByEmailRouteLive);
