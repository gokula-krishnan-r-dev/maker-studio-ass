**Task Manager SaaS - README**

---

### Introduction

Welcome to the Task Manager SaaS (Software as a Service) application! This web-based task management system allows users to create, update, delete, and list tasks. Each task can have a title, description, due date, and status, providing users with a comprehensive tool for managing their tasks effectively.

### Features

- **User Management**: Create new users to manage their tasks individually.
- **Task Management**: Perform CRUD operations on tasks, including creating, reading, updating, and deleting tasks.
- **RESTful API**: Expose a RESTful API for seamless integration with other systems.
- **Functional Programming**: Built using TypeScript and adhering to functional programming principles for robustness and maintainability.
- **Error Handling**: Robust error handling and logging using Effect-TS's capabilities.
- **Testing**: Comprehensive unit and integration tests ensure the correctness of the application.
- **Scalability**: Designed to handle a large number of users and tasks efficiently.
- **Version Control**: Clean and atomic Git commits for easy tracking of changes.

### Architecture

The Task Manager SaaS application is built using TypeScript and the Effect-TS library, following functional programming principles. It utilizes an in-memory database for storing user and task data, ensuring simplicity and scalability.

### Setup Instructions

To run the Task Manager SaaS application locally, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/gokula-krishnan-r-dev/maker-studio-ass.git
   ```

2. Install dependencies:

   ```bash
   cd task-manager-saas
   yarn install
   ```

3. Build the application:

   ```bash
   yarn build
   ```

4. Start the server:

   ```bash
   yarn start
   ```

5. Access the application in your web browser at `http://localhost:3000`.

### API Endpoints

- `POST /users`: Create a new user.
- `POST /users/:user_id/tasks`: Create a new task for the specified user.
- `GET /users/:user_id/tasks`: Retrieve all tasks for the specified user.
- `GET /users/:user_id/tasks/:task_id`: Retrieve a specific task for the specified user.
- `PUT /users/:user_id/tasks/:task_id`: Update a specific task for the specified user.
- `DELETE /users/:user_id/tasks/:task_id`: Delete a specific task for the specified user.

### Testing

To run the tests for the Task Manager SaaS application, execute the following command:

```bash
yarn test
```

### Additional Features (Future Development)

- **User Authentication**: Implement user authentication to secure user data and access.
- **Task Categories**: Allow users to categorize tasks for better organization.
- **Task Assignments**: Enable users to assign tasks to other users or collaborators.
