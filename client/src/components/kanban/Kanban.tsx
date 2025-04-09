import { useEffect, useState } from "react";
import {
  type Task,
  type Column as ColumnType,
  TaskStatus,
  TaskPriority,
} from "../types";
import { Column } from "./Column";
import { Box } from "@mui/material";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import axios from "axios";
import { PageHeader } from "../common/PageHeader";
import { StatCard } from "../common/StatCard";
import TaskAltIcon from "@mui/icons-material/TaskAlt";

const COLUMNS: ColumnType[] = [
  { id: "TODO", title: "To Do", color: "orange" },
  { id: "IN_PROGRESS", title: "In Progress", color: "green" },
  { id: "DONE", title: "Done", color: "black" },
];

interface TaskStat {
  priority: string;
  frequency: string;
}

export const Kanban = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [taskStats, setTaskStats] = useState<TaskStat[]>([]);

  const calculateTaskStats = (tasks: Task[]): TaskStat[] => {
    // Create a map to count frequencies of each priority
    const priorityCount = new Map<TaskPriority, number>();

    // Initialize counts for all priority levels
    Object.values(TaskPriority).forEach((priority) => {
      priorityCount.set(priority, 0);
    });

    // Count tasks by priority
    tasks.forEach((task) => {
      const currentCount = priorityCount.get(task.priority) || 0;
      priorityCount.set(task.priority, currentCount + 1);
    });

    // Calculate total tasks for percentage calculation
    const totalTasks = tasks.length;

    // Convert map to array of TaskStat objects with formatted percentages
    const stats: TaskStat[] = Array.from(priorityCount.entries()).map(
      ([priority, count]) => ({
        priority,
        frequency:
          totalTasks > 0 ? `${Math.round((count / totalTasks) * 100)}%` : "0%",
      })
    );

    // Sort by priority in order: High, Medium, Low
    const priorityOrder = {
      [TaskPriority.HIGH]: 0,
      [TaskPriority.MEDIUM]: 1,
      [TaskPriority.LOW]: 2,
    };

    return stats.sort(
      (a, b) =>
        priorityOrder[a.priority as TaskPriority] -
        priorityOrder[b.priority as TaskPriority]
    );
  };
  const updateTaskStatus = (taskId: string, newStatus: TaskStatus) => {
    try {
      axios.put("http://localhost:8000/v1/tasks/" + taskId + "/" + newStatus);
    } catch (err) {
      console.log("Failed to update the status");
    }
  };
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as Task["status"];

    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: newStatus,
            }
          : task
      )
    );

    updateTaskStatus(taskId, newStatus);
  };

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/tasks");
        if (response.status == 200) {
          setTasks(response.data);
          setTaskStats(calculateTaskStats(response.data));
        }
      } catch (error) {
        console.log("Error in fetching the tasks");
      }
    };
    fetchTasks();
  }, []);
  return (
    <Box>
      <PageHeader
        title={"KANBAN"}
        description="Easily organize your workload"
      />
      <Box
        display={"flex"}
        mx={2}
        my={0}
        gap={1}
        position={"relative"}
        zIndex={1}
      >
        {taskStats.map((stat) => (
          <StatCard
            title={stat.priority}
            value={stat.frequency}
            delta={0}
            icon={<TaskAltIcon />}
          />
        ))}
      </Box>
      <DndContext onDragEnd={handleDragEnd}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            padding: "1rem",
            height: "90vh",
          }}
        >
          {COLUMNS.map((column) => (
            <Column
              key={column.id}
              column={column}
              tasks={tasks.filter((task) => task.status === column.id)}
              setTasks={setTasks}
            />
          ))}
        </Box>
      </DndContext>
    </Box>
  );
};
