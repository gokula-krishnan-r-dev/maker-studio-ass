import { Effect, Layer } from "effect";
import { ServerLive } from "./services/serverService";
import { ExpressLive, get } from "./services/expressService";
import { IndexRouteLive, RouterTodoLive } from "./controllers/todo-controllers";
import { TodoRepositoryTest } from "./repositories/todoRepository";
import { RouterUserLive } from "./controllers/user-controllers";
import { UserRepositoryTest } from "./repositories/userRepository";

// Merge routes into a single layer
const RouterLive = Layer.mergeAll(IndexRouteLive);

// Combine all layers to create the final application layer
const AppLive = ServerLive.pipe(
  Layer.provide(RouterLive),
  Layer.provide(ExpressLive),
  Layer.provide(RouterUserLive),
  Layer.provide(RouterTodoLive)
);

// Run the application with the test data
const ServerProduction: any = AppLive.pipe(
  Layer.provide(TodoRepositoryTest),
  Layer.provide(UserRepositoryTest)
);

Effect.runFork(Layer.launch(ServerProduction));
