import { Context, Effect, Layer } from "effect";
import { Todo } from "../models/todo.model";

export class TodoRepository extends Context.Tag("TodoRepository")<
  TodoRepository,
  {
    getTodos: Effect.Effect<Todo[]>;
    getTodo: (id: number) => Effect.Effect<Todo | null>;
    getTodoById: (id: string) => Effect.Effect<Todo | null>;
    getTodoByUserIdTaskId: (
      user_id: string,
      task_id: string
    ) => Effect.Effect<Todo | null>;
    getTodosByUserId: (user_id: string) => Effect.Effect<Todo[]>;
    createTodo: (todo: Todo) => Effect.Effect<void>;
    updateTodo: (id: string, todo: Partial<Todo>) => Effect.Effect<Todo | null>;
    deleteTodo: (id: string) => Effect.Effect<void>;
  }
>() {}

const testData: Todo[] = [
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

const TodoRepositoryTest = Layer.succeed(TodoRepository, {
  getTodos: Effect.succeed(testData),
  getTodo: (id) =>
    Effect.succeed(testData.find((todo) => todo.id === id) || null),
  getTodoById: (id) =>
    Effect.succeed(testData.find((todo) => todo.id === id) || null),

  getTodoByUserIdTaskId: (user_id, task_id) =>
    Effect.succeed(
      testData.find(
        (todo) => todo.user_id === user_id && todo.id === task_id
      ) || null
    ),
  createTodo: (todo) =>
    Effect.sync(() => {
      testData.push(todo);
    }),
  getTodosByUserId: (user_id) =>
    Effect.sync(() => {
      return testData.filter((todo) => todo.user_id === user_id);
    }),
  updateTodo: (id, todo) =>
    Effect.sync(() => {
      const index = testData.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        testData[index] = { ...testData[index], ...todo };
        return testData[index];
      }
      return null;
    }),
  deleteTodo: (id) =>
    Effect.sync(() => {
      const index = testData.findIndex((todo) => todo.id === id);
      if (index !== -1) {
        testData.splice(index, 1);
      }
    }),
});

export { TodoRepositoryTest };
