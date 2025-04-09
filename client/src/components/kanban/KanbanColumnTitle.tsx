import { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Modal,
  TextField,
  Typography,
  Button,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { Task, TaskPriority, TaskStatus } from "../types";
import axios from "axios";

type ColumnTitleProps = {
  columnTitle: string;
  columnColor: string;
  columnTaskCount: number;
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

export const KanbanColumnTitle = ({
  columnTitle,
  columnColor,
  columnTaskCount,
  tasks,
  setTasks,
}: ColumnTitleProps) => {
  const [open, setOpen] = useState(false);
  const [newTask, setNewTask] = useState<Partial<Task>>({});

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleSaveTask = async () => {
    if (newTask.title) {
      var taskStatus = "TODO";
      if (columnTitle === "In Progress") {
        taskStatus = "IN_PROGRESS";
      } else if (columnTitle === "Done") {
        taskStatus = "DONE";
      }
      const addTask = {
        id: String(crypto.randomUUID()),
        status: taskStatus as TaskStatus,
        title: newTask.title,
        description: newTask.description || "",
        priority: newTask.priority as TaskPriority,
        tags: [],
      };
      try {
        await axios.post("http://localhost:8000/v1/tasks", addTask);
      } catch (error) {
        console.log("Error saving task to the backend");
      }
      setTasks([...tasks, addTask]);
      handleClose();
      setNewTask({});
    }
  };

  return (
    <Card sx={{ marginBottom: "1rem", display: "flex", alignItems: "stretch" }}>
      <Box
        sx={{
          width: "1rem",
          backgroundColor: columnColor,
          flexShrink: 0,
        }}
      />
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flex: 1,
          padding: "1rem",
        }}
      >
        <Box display="flex" alignItems="center">
          <Typography
            variant="subtitle1"
            sx={{ color: "text.secondary", marginRight: "0.5rem" }}
          >
            {columnTitle}
          </Typography>
          <Box
            sx={{
              borderRadius: "50%",
              width: "1.5rem",
              height: "1.5rem",
              backgroundColor: "grey",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "white",
              fontWeight: "bold",
            }}
          >
            {columnTaskCount}
          </Box>
        </Box>
        <IconButton onClick={handleOpen}>
          <AddCircleIcon />
        </IconButton>
      </CardContent>

      <Modal open={open} onClose={handleClose}>
        <Box>
          <Box
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: 400,
              bgcolor: "background.paper",
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6" component="h2">
              Add New Task
            </Typography>
            <TextField
              autoFocus
              margin="dense"
              label="Title"
              fullWidth
              value={newTask.title || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, title: e.target.value })
              }
            />
            <TextField
              margin="dense"
              label="Description"
              fullWidth
              value={newTask.description || ""}
              onChange={(e) =>
                setNewTask({ ...newTask, description: e.target.value })
              }
            />
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Priority</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={newTask.priority}
                label="Priority"
                onChange={(e) =>
                  setNewTask({
                    ...newTask,
                    priority: e.target.value as TaskPriority,
                  })
                }
              >
                <MenuItem value={TaskPriority.HIGH}>High</MenuItem>
                <MenuItem value={TaskPriority.MEDIUM}>Medium</MenuItem>
                <MenuItem value={TaskPriority.LOW}>Low</MenuItem>
              </Select>
              <Box display="flex" justifyContent="flex-end" mt={2}>
                <Button onClick={handleClose} sx={{ mr: 1 }}>
                  Cancel
                </Button>
                <Button variant="contained" onClick={handleSaveTask}>
                  Save Task
                </Button>
              </Box>
            </FormControl>
          </Box>
        </Box>
      </Modal>
    </Card>
  );
};
