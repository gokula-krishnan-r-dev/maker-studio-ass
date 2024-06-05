"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchData = void 0;
const axios_1 = __importDefault(require("axios"));
function fetchData(url, method, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let response;
            // Making a request based on the provided HTTP method
            switch (method) {
                case "GET":
                    response = yield axios_1.default.get(url);
                    break;
                case "POST":
                    // Example: sending a POST request with some data
                    response = yield axios_1.default.post(url, {
                        /* data */
                        data,
                    });
                    break;
                case "PUT":
                    // Example: sending a PUT request with some data
                    response = yield axios_1.default.put(url, {
                    /* data */
                    });
                    break;
                case "DELETE":
                    // Example: sending a DELETE request
                    response = yield axios_1.default.delete(url);
                    break;
                default:
                    throw new Error("Unsupported HTTP method");
            }
            // Returning the data from the response
            return response.data;
        }
        catch (error) {
            // Handle any errors that occur during the request
            // console.error("Error fetching data:", error);
            throw error; // Propagate the error
        }
    });
}
exports.fetchData = fetchData;
