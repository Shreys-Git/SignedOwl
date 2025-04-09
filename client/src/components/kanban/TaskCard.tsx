import { Card, Chip, Typography } from "@mui/material";
import { Task } from "../types";
import { useDraggable } from "@dnd-kit/core";

type TaskCardProps = {
  task: Task;
};

export function TaskCard({ task }: TaskCardProps) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  return (
    <Card
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      sx={{
        minHeight: "70px",
        padding: "1rem",
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
        willChange: "transform",
        cursor: "grab",
        overflow: "hidden",
        textOverflow: "ellipsis",
        whiteSpace: "nowrap",
      }}
    >
      {task.priority && (
        <Chip
          label={task.priority}
          size="small"
          color="warning"
          sx={{ padding: 0.5 }}
        />
      )}
      {task.tags?.map((tag) => (
        <Chip
          label={tag}
          size="small"
          color="info"
          sx={{ padding: 0.5, ml: 0.75 }}
        />
      ))}

      <Typography variant="h6" noWrap>
        {task.title}
      </Typography>
      <Typography variant="body2" noWrap>
        {task.description}
      </Typography>
    </Card>
  );
}
