"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepositoryTest = exports.UserRepository = void 0;
const effect_1 = require("effect");
class UserRepository extends effect_1.Context.Tag("UserRepository")() {
}
exports.UserRepository = UserRepository;
const userData = [
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
const UserRepositoryTest = effect_1.Layer.succeed(UserRepository, {
    getUsers: effect_1.Effect.succeed(userData),
    getUser: (id) => effect_1.Effect.succeed(userData.find((user) => user.id === id) || null),
    createUser: (user) => effect_1.Effect.sync(() => {
        userData.push(user);
    }),
    updateUser: (id, updatedUser) => effect_1.Effect.sync(() => {
        const userIndex = userData.findIndex((user) => user.id === id);
        if (userIndex > -1) {
            const currentUser = userData[userIndex];
            const newUser = Object.assign(Object.assign({}, currentUser), updatedUser);
            userData[userIndex] = newUser;
            return newUser;
        }
        return null;
    }),
    deleteUser: (id) => effect_1.Effect.sync(() => {
        const index = userData.findIndex((user) => user.id === id);
        if (index !== -1) {
            userData.splice(index, 1);
        }
    }),
    findUserByName: (name) => effect_1.Effect.succeed(userData.find((user) => user.name === name) || null),
    findUserByEmail: (email) => effect_1.Effect.succeed(userData.find((user) => user.email === email) || null),
    updateMultipleUsers: (updates) => effect_1.Effect.sync(() => {
        const updatedUsers = [];
        updates.forEach(({ id, data }) => {
            const userIndex = userData.findIndex((user) => user.id === id);
            if (userIndex > -1) {
                const currentUser = userData[userIndex];
                const newUser = Object.assign(Object.assign({}, currentUser), data);
                userData[userIndex] = newUser;
                updatedUsers.push(newUser);
            }
        });
        return updatedUsers;
    }),
});
exports.UserRepositoryTest = UserRepositoryTest;
