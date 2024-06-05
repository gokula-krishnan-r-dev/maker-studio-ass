"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TodoRepositoryTest = exports.TodoRepository = void 0;
const effect_1 = require("effect");
class TodoRepository extends effect_1.Context.Tag("TodoRepository")() {
}
exports.TodoRepository = TodoRepository;
const testData = [
    {
        id: "5dbae8807f3247488da7cfbf04920ba1",
        title: "Learn Effect",
        description: "Learn how to use Effect for building scalable applications.",
        status: "To Do",
        dueDate: new Date(),
        completed: false,
        user_id: "86e8329f978c4fb78b41a93bb01da5c5",
        user: {
            id: 1,
            name: "Alice",
            email: "alice@example.com",
            active: true,
            password: "123456",
        },
        createdAt: new Date(),
        updatedAt: new Date(),
    },
];
const TodoRepositoryTest = effect_1.Layer.succeed(TodoRepository, {
    getTodos: effect_1.Effect.succeed(testData),
    getTodo: (id) => effect_1.Effect.succeed(testData.find((todo) => todo.id === id) || null),
    getTodoById: (id) => effect_1.Effect.succeed(testData.find((todo) => todo.id === id) || null),
    getTodoByUserIdTaskId: (user_id, task_id) => effect_1.Effect.succeed(testData.find((todo) => todo.user_id === user_id && todo.id === task_id) || null),
    createTodo: (todo) => effect_1.Effect.sync(() => {
        testData.push(todo);
    }),
    getTodosByUserId: (user_id) => effect_1.Effect.sync(() => {
        return testData.filter((todo) => todo.user_id === user_id);
    }),
    updateTodo: (id, todo) => effect_1.Effect.sync(() => {
        const index = testData.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            testData[index] = Object.assign(Object.assign({}, testData[index]), todo);
            return testData[index];
        }
        return null;
    }),
    deleteTodo: (id) => effect_1.Effect.sync(() => {
        const index = testData.findIndex((todo) => todo.id === id);
        if (index !== -1) {
            testData.splice(index, 1);
        }
    }),
});
exports.TodoRepositoryTest = TodoRepositoryTest;
