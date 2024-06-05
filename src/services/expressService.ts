import { Context, Effect, FiberSet, Layer } from "effect";
import express from "express";
import { app } from "./serverService";

export class Express extends Context.Tag("Express")<
  Express,
  ReturnType<typeof express>
>() {}

export const get = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const run = yield* FiberSet.makeRuntime<R>();
    console.log("GET", path);
    app.get(path, (req, res) => run(body(req, res)));
  });

export const post = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const run = yield* FiberSet.makeRuntime<R>();
    app.post(path, (req, res) => {
      console.log("POST", path, req.body);

      run(body(req, res));
    });
  });

export const put = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const run = yield* FiberSet.makeRuntime<R>();
    app.put(path, (req, res) => run(body(req, res)));
  });

export const del = <A, E, R>(
  path: string,
  body: (req: express.Request, res: express.Response) => Effect.Effect<A, E, R>
) =>
  Effect.gen(function* () {
    const run = yield* FiberSet.makeRuntime<R>();
    app.delete(path, (req, res) => run(body(req, res)));
  });

export const ExpressLive = Layer.sync(Express, () => express());
