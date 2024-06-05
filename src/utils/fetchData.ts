import axios, { AxiosResponse } from "axios";

export async function fetchData(
  url: string,
  method: "GET" | "POST" | "PUT" | "DELETE",
  data?: any
): Promise<any> {
  try {
    let response: AxiosResponse<any>;
    // Making a request based on the provided HTTP method
    switch (method) {
      case "GET":
        response = await axios.get(url);
        break;
      case "POST":
        // Example: sending a POST request with some data
        response = await axios.post(url, {
          /* data */
          data,
        });
        break;
      case "PUT":
        // Example: sending a PUT request with some data
        response = await axios.put(url, {
          /* data */
        });
        break;
      case "DELETE":
        // Example: sending a DELETE request
        response = await axios.delete(url);
        break;

      default:
        throw new Error("Unsupported HTTP method");
    }
    // Returning the data from the response
    return response.data;
  } catch (error) {
    // Handle any errors that occur during the request
    // console.error("Error fetching data:", error);
    throw error; // Propagate the error
  }
}
