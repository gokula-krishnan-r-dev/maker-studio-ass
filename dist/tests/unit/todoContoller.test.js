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
describe("add Task", () => {
    it("creates a new task", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
            completed: false,
        };
        // Mocked response data
        const responseData = {
            id: 101,
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
            completed: false,
        };
        axios_1.default.post.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks", "POST", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            title: requestData.title,
            description: requestData.description,
            status: requestData.status,
            dueDate: requestData.dueDate,
            completed: requestData.completed,
        }));
    }));
    it("returns an error if title, description, status, dueDate, or completed is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
        };
        // Mocked response data
        const responseData = {
            error: "Status, dueDate, and completed are required.",
            success: false,
            status: 400,
        };
        axios_1.default.post.mockResolvedValueOnce({
            status: 400,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks", "POST", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            error: responseData.error,
            success: responseData.success,
            status: responseData.status,
        }));
    }));
    it("returns an error if user_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
            completed: false,
        };
        // Mocked response data
        const responseData = {
            error: "User with id 86e8329f978c4fb78b41a93bb01da5c5 not found in the database.",
            success: false,
            status: 404,
        };
        axios_1.default.post.mockResolvedValueOnce({
            status: 404,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks", "POST", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            error: responseData.error,
            success: responseData.success,
            status: responseData.status,
        }));
    }));
    it("returns an error if the user_id is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
            completed: false,
        };
        // Mocked response data
        const responseData = {
            error: "User ID is required.",
            success: false,
            status: 400,
        };
        axios_1.default.post.mockResolvedValueOnce({
            status: 400,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users//tasks", "POST", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            error: responseData.error,
            success: responseData.success,
            status: responseData.status,
        }));
    }));
});
// get task by id http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks
describe("get task by id", () => {
    it("returns a task by id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            id: 101,
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
            completed: false,
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/101", "GET");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            title: responseData.title,
            description: responseData.description,
            status: responseData.status,
            dueDate: responseData.dueDate,
            completed: responseData.completed,
        }));
    }));
    it("returns an error if the task is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: `Task with id 101 not found in the database.`,
            status: 404,
            success: false,
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 404,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/101", "GET");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            message: responseData.message,
            status: responseData.status,
            success: responseData.success,
        }));
    }));
    it("returns an error if the user_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: `User with id 86e8329f978c4fb78b41a93bb01da5c5 not found in the database.`,
            status: 404,
            success: false,
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 404,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/101", "GET");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            message: responseData.message,
            status: responseData.status,
            success: responseData.success,
        }));
    }));
});
// get find by task id and user id http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1
describe("get task by id and user id", () => {
    it("returns a task by id and user id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            id: 101,
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "To Do",
            dueDate: "2021-09-30",
            completed: false,
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/101", "GET");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            title: responseData.title,
            description: responseData.description,
            status: responseData.status,
            dueDate: responseData.dueDate,
            completed: responseData.completed,
        }));
    }));
    it("returns an error if the task is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: `Task with id 101 not found in the database.`,
            status: 404,
            success: false,
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 404,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/101", "GET");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            message: responseData.message,
            status: responseData.status,
            success: responseData.success,
        }));
    }));
    it("returns an error if the user_id is invalid", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: `User with id 86e8329f978c4fb78b41a93bb01da5c5 not found in the database.`,
            status: 404,
            success: false,
        };
        axios_1.default.get.mockResolvedValueOnce({
            status: 404,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/101", "GET");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            message: responseData.message,
            status: responseData.status,
            success: responseData.success,
        }));
    }));
});
// Update task by http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1
describe("update task by id and user id", () => {
    it("updates a task by id and user id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "In Progress",
            dueDate: "2021-09-30",
            completed: false,
        };
        // Mocked response data
        const responseData = {
            id: 101,
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "In Progress",
            dueDate: "2021-09-30",
            completed: false,
        };
        axios_1.default.put.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1", "PUT", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            title: requestData.title,
            description: requestData.description,
            status: requestData.status,
            dueDate: requestData.dueDate,
            completed: requestData.completed,
        }));
    }));
    it("returns an error if title, description, status, dueDate, or completed is missing", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked request data
        const requestData = {
            title: "Learn Effect",
            description: "Learn how to use Effect for building scalable applications.",
            status: "In Progress",
            dueDate: "2021-09-30",
        };
        // Mocked response data
        const responseData = {
            error: "Status, dueDate, and completed are required.",
            success: false,
            status: 400,
        };
        axios_1.default.put.mockResolvedValueOnce({
            status: 400,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1", "PUT", requestData);
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            error: responseData.error,
            success: responseData.success,
            status: responseData.status,
        }));
    }));
});
// delete task by id and user id http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1
describe("delete task by id and user id", () => {
    it("deletes a task by id and user id", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: `Task with id 3392486114b346a8b1c3b1cefd6a4ad1 deleted successfully.`,
            status: 200,
            success: true,
        };
        axios_1.default.delete.mockResolvedValueOnce({
            status: 200,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1", "DELETE");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            message: responseData.message,
            status: responseData.status,
            success: responseData.success,
        }));
    }));
    it("returns an error if the task is not found", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mocked response data
        const responseData = {
            message: `Task with id 3392486114b346a8b1c3b1cefd6a4ad1 not found in the database.`,
            status: 404,
            success: false,
        };
        axios_1.default.delete.mockResolvedValueOnce({
            status: 404,
            data: responseData,
        });
        // Calling the fetchData function
        const result = yield (0, fetchData_1.fetchData)("http://localhost:3000/users/86e8329f978c4fb78b41a93bb01da5c5/tasks/3392486114b346a8b1c3b1cefd6a4ad1", "DELETE");
        // Assertions excluding id field
        expect(result).toEqual(expect.objectContaining({
            message: responseData.message,
            status: responseData.status,
            success: responseData.success,
        }));
    }));
});
