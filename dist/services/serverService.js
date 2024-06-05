"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServerLive = exports.app = void 0;
const effect_1 = require("effect");
const express_1 = __importDefault(require("express"));
exports.app = (0, express_1.default)();
exports.app.use(express_1.default.json());
exports.app.use(express_1.default.urlencoded({ extended: true }));
exports.app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});
exports.ServerLive = effect_1.Layer.scopedDiscard(effect_1.Effect.gen(function* () {
    const port = process.env.PORT || 3000;
    yield* effect_1.Effect.acquireRelease(effect_1.Effect.sync(() => exports.app.listen(port, () => console.log(`Server running at http://localhost:${port}`))), (server) => effect_1.Effect.sync(() => server.close()));
}));
