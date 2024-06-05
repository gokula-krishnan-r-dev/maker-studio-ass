import { Effect, Layer } from "effect";
import { UserRepository } from "../repositories/userRepository";
import { User } from "../models/user.model";
import { get, post } from "../services/expressService";
import { v4 as uuidv4 } from "uuid";
import { isValidEmail } from "../utils/valid";

// POST /users
export const CreateUserRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* post("/user", (req, res) =>
      Effect.gen(function* () {
        const { name, email, password } = req.body as Partial<User>;
        if (!name || !email || !password) {
          res.status(400).send({ error: "Name, email, status are required." });
          return;
        }
        if (!isValidEmail(email)) {
          res.status(400).send({
            error: "Invalid email format.",
            success: false,
            status: 400,
          });
          return;
        }
        const user: User = {
          id: uuidv4().split("-").join(""),
          name,
          email,
          active: true,
          password,
        };
        yield* repo.createUser(user);
        res.status(201).send(user);
      })
    );
  })
);

// GET /users
export const GetUserRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* get("/users", (_, res) =>
      Effect.gen(function* () {
        const users = yield* repo.getUsers;
        res.json({ users, message: "Hello World", status: 200, success: true });
      })
    );
  })
);

// GET /users/:id
export const GetUserByIdRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* get("/user/:id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.id;
        const user = yield* repo.getUser(id);
        if (user) {
          res.json(user);
        } else {
          res.status(404).send();
        }
      })
    );
  })
);

// PUT /users/:id
export const UpdateUserRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* post("/user/:id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.id;
        const updatedUser = req.body as Partial<User>;
        yield* repo.updateUser(id, updatedUser);
        res.status(204).send();
      })
    );
  })
);

// DELETE /users/:id
export const DeleteUserRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* post("/user/:id", (req, res) =>
      Effect.gen(function* () {
        const id = req.params.id;
        yield* repo.deleteUser(id);
        res.status(204).send();
      })
    );
  })
);

// GET /users/name/:name
export const GetUserByNameRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* get("/user/name/:name", (req, res) =>
      Effect.gen(function* () {
        const name = req.params.name;
        const user = yield* repo.findUserByName(name);
        if (user) {
          res.json(user);
        } else {
          res.status(404).send();
        }
      })
    );
  })
);

// GET /user/email/:email
export const GetUserByEmailRouteLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const repo = yield* UserRepository;
    yield* get("/user/email/:email", (req, res) =>
      Effect.gen(function* () {
        const email = req.params.email;
        const user = yield* repo.findUserByEmail(email);
        if (user) {
          res.json(user);
        } else {
          res.status(404).send();
        }
      })
    );
  })
);

export const RouterUserLive = Layer.mergeAll(
  CreateUserRouteLive,
  GetUserRouteLive,
  GetUserByIdRouteLive,
  UpdateUserRouteLive,
  DeleteUserRouteLive,
  GetUserByNameRouteLive,
  GetUserByEmailRouteLive
);
