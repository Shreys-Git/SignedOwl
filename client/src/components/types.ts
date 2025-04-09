export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export enum TaskPriority {
  HIGH = "High",
  MEDIUM = "Medium",
  LOW = "Low",
}
export type Task = {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  tags?: string[];
};

export type Column = {
  id: TaskStatus;
  title: string;
  color: string;
};

export type TextProp = {
  text: string;
};
