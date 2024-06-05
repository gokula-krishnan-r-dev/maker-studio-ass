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
const axios_1 = __importDefault(require("axios"));
const fetchData_1 = require("../../utils/fetchData");
jest.mock("axios"); // Mocking Axios module
describe("createUser", () => {
    it("creates a new user", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            name: "John Doe",
            email: "gokulakrishnan@example.com",
            password: "password",
        };
        // Mocked response data
        const responseData = {
            id: 101,
            name: "John Doe",
            email: "gokulakrishnan@example.com",
            password: "password",
        };
        axios_1.default.post.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/user", "POST", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            name: requestData.name,
            email: requestData.email,
            password: requestData.password,
        }));
    }));
    it("returns an error if name, email, or password is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            name: "John Doe",
            email: "invalid-email",
            password: "password",
        };
        // Mocked response data
        const responseData = {
            error: "Invalid email format.",
            success: false,
            status: 400,
        };
        axios_1.default.post.mockRejectedValueOnce({
            response: {
                status: 400,
                data: responseData,
            },
        });
        // Calling the fetchData function
        try {
            yield (0, fetchData_1.fetchData)("http://localhost:3000/user", "POST", requestData);
        }
        catch (error) {
            expect(error.response.status).toBe(400);
            expect(error.response.data).toEqual(responseData);
        }
    }));
});
describe("getUser", () => {
    it("returns a list of users", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
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
        axios_1.default.get.mockResolvedValueOnce({
            status: 200,
            data: userData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users", "GET");
        // Assertions
        expect(result).toEqual(userData);
    }));
    it("returns an empty list if no users are found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const userData = [];
        axios_1.default.get.mockResolvedValueOnce({
            status: 200,
            data: userData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users", "GET");
        // Assertions
        expect(result).toEqual(userData);
    }));
    it("returns an error if the request fails", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            error: "Internal server error.",
            success: false,
            status: 500,
        };
        axios_1.default.get.mockRejectedValueOnce({
            response: {
                status: 500,
                data: responseData,
            },
        });
        // Calling the fetchData function
        try {
            yield (0, fetchData_1.fetchData)("http://localhost:3000/users", "GET");
        }
        catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toEqual(responseData);
        }
    }));
    it("returns a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const userData = {
            id: "86e8329f978c4fb78b41a93bb01da5c5",
            name: "Alice",
            email: "alice@example.com",
            active: true,
            password: "123456",
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 200,
            data: userData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5", "GET");
        // Assertions
        expect(result).toEqual(userData);
    }));
    it("returns an error if the user is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            error: "User not found.",
            success: false,
            status: 404,
        };
        axios_1.default.get.mockRejectedValueOnce({
            response: {
                status: 404,
                data: responseData,
            },
        });
        // Calling the fetchData function
        try {
            yield (0, fetchData_1.fetchData)("http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5", "GET");
        }
        catch (error) {
            expect(error.response.status).toBe(404);
            expect(error.response.data).toEqual(responseData);
        }
    }));
});
describe("updateUser", () => {
    it("updates a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            name: "Alice",
            email: "alice@example.com",
            active: true,
            password: "123456",
        };
        // Mocked response data
        const responseData = {
            id: "86e8329f978c4fb78b41a93bb01da5c5",
            name: "Alice",
            email: "alice@example.com",
            active: true,
            password: "123456",
        };
        axios_1.default.put.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5", "PUT", requestData);
        // Assertions
        expect(result).toEqual(responseData);
    }));
    it("returns an error if the request fails to update a user", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            name: "Alice",
            email: "alice@example.com",
            active: true,
            password: "123456",
        };
        // Mocked response data
        const responseData = {
            error: "Failed to update user.",
            success: false,
            status: 500,
        };
        axios_1.default.put.mockRejectedValueOnce({
            response: {
                status: 500,
                data: responseData,
            },
        });
        // Calling the fetchData function
        try {
            yield (0, fetchData_1.fetchData)("http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5", "PUT", requestData);
        }
        catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toEqual(responseData);
        }
    }));
});
describe("deleteUser", () => {
    it("deletes a user by id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: "User deleted successfully.",
            success: true,
            status: 200,
        };
        axios_1.default.delete.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5", "DELETE");
        // Assertions
        expect(result).toEqual(responseData);
    }));
    it("returns an error if the request fails to delete a user", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            error: "Failed to delete user.",
            success: false,
            status: 500,
        };
        axios_1.default.delete.mockRejectedValueOnce({
            response: {
                status: 500,
                data: responseData,
            },
        });
        // Calling the fetchData function
        try {
            yield (0, fetchData_1.fetchData)("http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5", "DELETE");
        }
        catch (error) {
            expect(error.response.status).toBe(500);
            expect(error.response.data).toEqual(responseData);
        }
    }));
});
