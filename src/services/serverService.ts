import { Effect, Layer } from "effect";
import express from "express";
export const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

export const ServerLive = Layer.scopedDiscard(
  Effect.gen(function* () {
    const port = process.env.PORT || 3000;

    yield* Effect.acquireRelease(
      Effect.sync(() =>
        app.listen(port, () =>
          console.log(`Server running at http://localhost:${port}`)
        )
      ),
      (server) => Effect.sync(() => server.close())
    );
  })
);
