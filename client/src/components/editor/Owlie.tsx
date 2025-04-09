import { Box, Button, Card, Divider, Typography } from "@mui/material";
import { useState } from "react";
import { MagicEditor } from "./MagicEditor";
import { Tasks } from "../files/Tasks";
import { Edit } from "@mui/icons-material";
import InsightsIcon from "@mui/icons-material/Insights";
import ConstructionIcon from "@mui/icons-material/Construction";
import { Insights } from "./Insights";

type OwlieProps = {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

type View = "magicEditor" | "insights" | "tasks";

export const Owlie = ({
  editorContent,
  setEditorContent,
  prompt,
  setPrompt,
}: OwlieProps) => {
  const [currentView, setCurrentView] = useState<View>("magicEditor");

  const views = {
    magicEditor: (
      <MagicEditor
        editorContent={editorContent}
        setEditorContent={setEditorContent}
        prompt={prompt}
        setPrompt={setPrompt}
      />
    ),
    insights: <Insights agreement={editorContent} />,
    tasks: <Tasks />,
  };

  return (
    <Card sx={{ borderRadius: 0 }}>
      <Box
        sx={{
          background: "linear-gradient(to bottom, #1a1f2e, #1f2937)",
          color: "white",
          padding: "16px 24px",
        }}
      >
        <Typography variant="h5" fontWeight="600">
          Owlie
        </Typography>
        <Typography variant="body2" color="gray.300">
          Your AI partner
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          padding: "8px 16px",
          background: "#374151",
          borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <Button
          variant={currentView === "magicEditor" ? "contained" : "text"}
          sx={{
            color: "white",
            ...(currentView === "magicEditor" && {
              background: "#6366f1",
              "&:hover": { background: "#4f46e5" },
            }),
          }}
          startIcon={<Edit />}
          onClick={() => setCurrentView("magicEditor")}
        >
          Magic Edit
        </Button>
        <Button
          variant={currentView === "insights" ? "contained" : "text"}
          sx={{
            color: "white",
            ...(currentView === "insights" && {
              background: "#6366f1",
              "&:hover": { background: "#4f46e5" },
            }),
          }}
          startIcon={<InsightsIcon />}
          onClick={() => setCurrentView("insights")}
        >
          Insights
        </Button>
        <Button
          variant={currentView === "tasks" ? "contained" : "text"}
          sx={{
            color: "white",
            ...(currentView === "tasks" && {
              background: "#6366f1",
              "&:hover": { background: "#4f46e5" },
            }),
          }}
          startIcon={<ConstructionIcon />}
          onClick={() => setCurrentView("tasks")}
        >
          Tasks
        </Button>
      </Box>

      <Box sx={{ padding: "16px" }}>{views[currentView]}</Box>
    </Card>
  );
};
