import axios from "axios";
import { fetchData } from "../../utils/fetchData";
import { User } from "../../models/user.model";

jest.mock("axios"); // Mocking Axios module

describe("createUser", () => {
  it("creates a new user", async () => {
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

    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });

    // Calling the fetchData function
    const result = await fetchData(
      "http://localhost:3000/user",
      "POST",
      requestData
    );

    // Assertions excluding id field
    expect(result).toEqual(
      expect.objectContaining({
        name: requestData.name,
        email: requestData.email,
        password: requestData.password,
      })
    );
  });
  it("returns an error if name, email, or password is missing", async () => {
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

    (
      axios.post as jest.MockedFunction<typeof axios.post>
    ).mockRejectedValueOnce({
      response: {
        status: 400,
        data: responseData,
      },
    });

    // Calling the fetchData function
    try {
      await fetchData("http://localhost:3000/user", "POST", requestData);
    } catch (error: any) {
      expect(error.response.status).toBe(400);
      expect(error.response.data).toEqual(responseData);
    }
  });
});

describe("getUser", () => {
  it("returns a list of users", async () => {
    // Mocked response data
    const userData: User[] = [
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

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      status: 200,
      data: userData,
    });

    // Calling the fetchData function
    const result = await fetchData("http://localhost:3000/users", "GET");

    // Assertions
    expect(result).toEqual(userData);
  });

  it("returns an empty list if no users are found", async () => {
    // Mocked response data
    const userData: User[] = [];

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      status: 200,
      data: userData,
    });

    // Calling the fetchData function
    const result = await fetchData("http://localhost:3000/users", "GET");

    // Assertions
    expect(result).toEqual(userData);
  });

  it("returns an error if the request fails", async () => {
    // Mocked response data
    const responseData = {
      error: "Internal server error.",
      success: false,
      status: 500,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: {
        status: 500,
        data: responseData,
      },
    });

    // Calling the fetchData function
    try {
      await fetchData("http://localhost:3000/users", "GET");
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.data).toEqual(responseData);
    }
  });

  it("returns a user by id", async () => {
    // Mocked response data
    const userData: User = {
      id: "86e8329f978c4fb78b41a93bb01da5c5",
      name: "Alice",
      email: "alice@example.com",
      active: true,
      password: "123456",
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockResolvedValueOnce({
      status: 200,
      data: userData,
    });

    // Calling the fetchData function

    const result = await fetchData(
      "http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5",
      "GET"
    );

    // Assertions
    expect(result).toEqual(userData);
  });

  it("returns an error if the user is not found", async () => {
    // Mocked response data
    const responseData = {
      error: "User not found.",
      success: false,
      status: 404,
    };

    (axios.get as jest.MockedFunction<typeof axios.get>).mockRejectedValueOnce({
      response: {
        status: 404,
        data: responseData,
      },
    });

    // Calling the fetchData function
    try {
      await fetchData(
        "http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5",
        "GET"
      );
    } catch (error: any) {
      expect(error.response.status).toBe(404);
      expect(error.response.data).toEqual(responseData);
    }
  });
});

describe("updateUser", () => {
  it("updates a user by id", async () => {
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

    (axios.put as jest.MockedFunction<typeof axios.put>).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });

    // Calling the fetchData function
    const result = await fetchData(
      "http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5",
      "PUT",
      requestData
    );

    // Assertions

    expect(result).toEqual(responseData);
  });

  it("returns an error if the request fails to update a user", async () => {
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
    (axios.put as jest.MockedFunction<typeof axios.put>).mockRejectedValueOnce({
      response: {
        status: 500,
        data: responseData,
      },
    });
    // Calling the fetchData function
    try {
      await fetchData(
        "http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5",
        "PUT",
        requestData
      );
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.data).toEqual(responseData);
    }
  });
});

describe("deleteUser", () => {
  it("deletes a user by id", async () => {
    // Mocked response data
    const responseData = {
      message: "User deleted successfully.",
      success: true,
      status: 200,
    };
    (
      axios.delete as jest.MockedFunction<typeof axios.delete>
    ).mockResolvedValueOnce({
      status: 200,
      data: responseData,
    });
    // Calling the fetchData function
    const result = await fetchData(
      "http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5",
      "DELETE"
    );
    // Assertions
    expect(result).toEqual(responseData);
  });
  it("returns an error if the request fails to delete a user", async () => {
    // Mocked response data
    const responseData = {
      error: "Failed to delete user.",
      success: false,
      status: 500,
    };
    (
      axios.delete as jest.MockedFunction<typeof axios.delete>
    ).mockRejectedValueOnce({
      response: {
        status: 500,
        data: responseData,
      },
    });

    // Calling the fetchData function
    try {
      await fetchData(
        "http://localhost:3000/user/86e8329f978c4fb78b41a93bb01da5c5",
        "DELETE"
      );
    } catch (error: any) {
      expect(error.response.status).toBe(500);
      expect(error.response.data).toEqual(responseData);
    }
  });
});
