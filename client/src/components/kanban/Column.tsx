import { Box } from "@mui/material";
import { TaskCard } from "./TaskCard";
import { Column as ColumnType, Task } from "../types";
import { useDroppable } from "@dnd-kit/core";
import { KanbanColumnTitle } from "./KanbanColumnTitle";

type ColumnProps = {
  column: ColumnType;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export function Column({ column, tasks, setTasks }: ColumnProps) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  return (
    <Box
      sx={{
        padding: "1rem",
        width: "100%",
        bgcolor: "#f5f5f5",
        borderRadius: "4px",
        height: "100%",
      }}
    >
      <KanbanColumnTitle
        columnTitle={column.title}
        columnColor={column.color}
        columnTaskCount={tasks.length}
        tasks={tasks}
        setTasks={setTasks}
      />
      <Box
        ref={setNodeRef}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          height: "100%",
        }}
      >
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </Box>
    </Box>
  );
}
