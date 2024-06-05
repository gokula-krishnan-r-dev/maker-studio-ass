"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpressLive = exports.del = exports.put = exports.post = exports.get = exports.Express = void 0;
const effect_1 = require("effect");
const express_1 = __importDefault(require("express"));
const serverService_1 = require("./serverService");
class Express extends effect_1.Context.Tag("Express")() {
}
exports.Express = Express;
const get = (path, body) => effect_1.Effect.gen(function* () {
    const run = yield* effect_1.FiberSet.makeRuntime();
    console.log("GET", path);
    serverService_1.app.get(path, (req, res) => run(body(req, res)));
});
exports.get = get;
const post = (path, body) => effect_1.Effect.gen(function* () {
    const run = yield* effect_1.FiberSet.makeRuntime();
    serverService_1.app.post(path, (req, res) => {
        console.log("POST", path, req.body);
        run(body(req, res));
    });
});
exports.post = post;
const put = (path, body) => effect_1.Effect.gen(function* () {
    const run = yield* effect_1.FiberSet.makeRuntime();
    serverService_1.app.put(path, (req, res) => run(body(req, res)));
});
exports.put = put;
const del = (path, body) => effect_1.Effect.gen(function* () {
    const run = yield* effect_1.FiberSet.makeRuntime();
    serverService_1.app.delete(path, (req, res) => run(body(req, res)));
});
exports.del = del;
exports.ExpressLive = effect_1.Layer.sync(Express, () => (0, express_1.default)());
