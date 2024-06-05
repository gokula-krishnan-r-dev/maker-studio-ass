import { Context, Effect, Layer } from "effect";
import { User } from "../models/user.model";

export class UserRepository extends Context.Tag("UserRepository")<
  UserRepository,
  {
    getUsers: Effect.Effect<User[]>;
    getUser: (id: string) => Effect.Effect<User | null>;
    createUser: (user: User) => Effect.Effect<void>;
    updateUser: (id: string, user: Partial<User>) => Effect.Effect<User | null>;
    deleteUser: (id: string) => Effect.Effect<void>;
    findUserByName: (name: string) => Effect.Effect<User | null>;
    findUserByEmail: (email: string) => Effect.Effect<User | null>;
    updateMultipleUsers: (
      updates: { id: string; data: Partial<User> }[]
    ) => Effect.Effect<User[]>;
  }
>() {}

const userData: User[] = [
  {
    id: "86e8329f978c4fb78b41a93bb01da5c5",
    name: "Alice",
    email: "alice@example.com",
    active: true,
    password: "123456",
  },
  {
    id: "f6e8329f978c4fb78b41a93b5c5",
    name: "Bob",
    email: "bob@gmail.com",
    active: true,
    password: "123456",
  },
  {
    id: "f6e8329f978c4fb78b41a93bb05c5",
    name: "Charlie",
    email: "Charlie@gmail.com",
    active: true,
    password: "231232",
  },
];

const UserRepositoryTest = Layer.succeed(UserRepository, {
  getUsers: Effect.succeed(userData),
  getUser: (id) =>
    Effect.succeed(userData.find((user) => user.id === id) || null),
  createUser: (user) =>
    Effect.sync(() => {
      userData.push(user);
    }),
  updateUser: (id, updatedUser) =>
    Effect.sync(() => {
      const userIndex = userData.findIndex((user) => user.id === id);
      if (userIndex > -1) {
        const currentUser = userData[userIndex];
        const newUser = { ...currentUser, ...updatedUser };
        userData[userIndex] = newUser;
        return newUser;
      }
      return null;
    }),
  deleteUser: (id) =>
    Effect.sync(() => {
      const index = userData.findIndex((user) => user.id === id);
      if (index !== -1) {
        userData.splice(index, 1);
      }
    }),
  findUserByName: (name) =>
    Effect.succeed(userData.find((user) => user.name === name) || null),
  findUserByEmail: (email) =>
    Effect.succeed(userData.find((user) => user.email === email) || null),
  updateMultipleUsers: (updates) =>
    Effect.sync(() => {
      const updatedUsers: User[] = [];
      updates.forEach(({ id, data }) => {
        const userIndex = userData.findIndex((user) => user.id === id);
        if (userIndex > -1) {
          const currentUser = userData[userIndex];
          const newUser = { ...currentUser, ...data };
          userData[userIndex] = newUser;
          updatedUsers.push(newUser);
        }
      });
      return updatedUsers;
    }),
});

export { UserRepositoryTest };
