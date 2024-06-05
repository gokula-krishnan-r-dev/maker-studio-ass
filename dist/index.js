"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effect_1 = require("effect");
const serverService_1 = require("./services/serverService");
const expressService_1 = require("./services/expressService");
const todo_controllers_1 = require("./controllers/todo-controllers");
const todoRepository_1 = require("./repositories/todoRepository");
const user_controllers_1 = require("./controllers/user-controllers");
const userRepository_1 = require("./repositories/userRepository");
// Merge routes into a single layer
const RouterLive = effect_1.Layer.mergeAll(todo_controllers_1.IndexRouteLive);
// Combine all layers to create the final application layer
const AppLive = serverService_1.ServerLive.pipe(effect_1.Layer.provide(RouterLive), effect_1.Layer.provide(expressService_1.ExpressLive), effect_1.Layer.provide(user_controllers_1.RouterUserLive), effect_1.Layer.provide(todo_controllers_1.RouterTodoLive));
// Run the application with the test data
const ServerProduction = AppLive.pipe(effect_1.Layer.provide(todoRepository_1.TodoRepositoryTest), effect_1.Layer.provide(userRepository_1.UserRepositoryTest));
effect_1.Effect.runFork(effect_1.Layer.launch(ServerProduction));
