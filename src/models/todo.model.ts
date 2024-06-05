import { User } from "./user.model";

export interface Todo {
  id: string | number;
  title: string;
  description?: string;
  status?: "To Do" | "In Progress" | "Done";
  dueDate?: Date;
  completed?: boolean;
  user_id?: string;
  createdAt?: Date;
  user?: User;
  updatedAt?: Date;
}
