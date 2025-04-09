import {
  Box,
  Button,
  Card,
  CircularProgress,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import BoltIcon from "@mui/icons-material/Bolt";
import axios from "axios";
import { useState } from "react";
import DifferenceIcon from "@mui/icons-material/Difference";
import { useParams } from "react-router-dom";

type EditorPromptProps = {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
  prompt: string;
  setPrompt: React.Dispatch<React.SetStateAction<string>>;
};

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
  maxHeight: "80vh",
};

const modalContentStyle = {
  flex: 1, // Allow this area to expand and take up available space
  overflowY: "auto", // Enable scrolling for content
  padding: "16px",
};

const modalFooterStyle = {
  borderTop: "1px solid #ddd",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
};

export const MagicEditor = ({
  editorContent,
  setEditorContent,
  prompt,
  setPrompt,
}: EditorPromptProps) => {
  const [open, setOpen] = useState(false);
  const [diffs, setDiffs] = useState<string[]>([]);
  const [isAIEditing, setIsAIEditing] = useState<boolean>();
  const params = useParams();
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const promptLLM = () => {
    setIsAIEditing(true);
    const data = {
      prompt: prompt,
      agreement: formatAgreement(editorContent),
      document_id: params.documentId,
    };
    console.log("Sending the Data: ", data);
    axios
      .post("http://localhost:8000/v1/documents/magicEdit", data)
      .then((response) => {
        setEditorContent(response.data.updated_agreement);
        setDiffs(response.data.differences);
        setIsAIEditing(false);
      })
      .catch((error) => console.error("Error editing document:", error));
  };

  const handlePromptChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrompt(event.target.value);
  };

  const acceptChange = (index: number) => {
    const updatedDiffs = diffs.slice(); // Create a shallow copy
    updatedDiffs[index] = updatedDiffs[index].replace(/^[-+]/, " "); // Mark as accepted
    setDiffs(updatedDiffs);
  };

  const rejectChange = (index: number) => {
    const updatedDiffs = diffs.slice(); // Create a shallow copy
    updatedDiffs.splice(index, 1); // Remove the rejected line
    setDiffs(updatedDiffs);
  };

  const saveChanges = () => {
    const finalContent = diffs
      .filter((line) => !line.startsWith("-")) // Exclude rejected lines
      .map((line) => line.replace(/^[-+ ]/, "")) // Remove markers
      .join("\n"); // Combine lines into final content
    setEditorContent(finalContent); // Update editor content
    setOpen(false); // Close modal
  };

  const formatAgreement = (content: string) => {
    return content
      .replace(/"/g, '\\"')
      .replace(/'/g, "\\'")
      .replace(/\n/g, "\\n");
  };

  const formatDifferences = (diffs: string[]): string => {
    return diffs
      .map((line, index) => {
        if (line.startsWith("+")) {
          return `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span style="background-color: #d4edda; color: black; padding: 2px; flex-grow: 1;">
                ${line}
              </span>
              <button 
                onclick="window.acceptChange(${index})" 
                style="background-color: #4caf50; color: white; border: none; padding: 2px 6px; cursor: pointer;">
                Accept
              </button>
              <button 
                onclick="window.rejectChange(${index})" 
                style="background-color: #f44336; color: white; border: none; padding: 2px 6px; cursor: pointer;">
                Reject
              </button>
            </div>`;
        } else if (line.startsWith("-")) {
          return `
            <div style="display: flex; align-items: center; gap: 10px; margin-bottom: 4px;">
              <span style="background-color: #f8d7da; color: black; padding: 2px; text-decoration: line-through; flex-grow: 1;">
                ${line}
              </span>
              <button 
                onclick="window.acceptChange(${index})" 
                style="background-color: #4caf50; color: white; border: none; padding: 2px 6px; cursor: pointer;">
                Accept
              </button>
              <button 
                onclick="window.rejectChange(${index})" 
                style="background-color: #f44336; color: white; border: none; padding: 2px 6px; cursor: pointer;">
                Reject
              </button>
            </div>`;
        } else if (line.startsWith(" ")) {
          return `<div style="margin-bottom: 4px;">${line}</div>`;
        }
        return `<div>${line}</div>`;
      })
      .join("");
  };

  // Attach handlers to the window object (to work with `dangerouslySetInnerHTML`)
  (window as any).acceptChange = acceptChange;
  (window as any).rejectChange = rejectChange;

  return (
    <Box padding="20px">
      <TextField
        id="filled-multiline-flexible"
        label="Prompt..."
        multiline
        rows={8}
        variant="filled"
        value={prompt}
        onChange={handlePromptChange}
        sx={{ width: "100%" }}
      />
      <Box display="flex" gap={1} p={1}>
        <Button
          startIcon={<DifferenceIcon />}
          variant="outlined"
          onClick={handleOpen}
          sx={{ flex: 1 }}
        >
          Changes
        </Button>
        <Button
          onClick={promptLLM}
          variant="contained"
          disabled={isAIEditing}
          startIcon={<BoltIcon />}
          sx={{ flex: 1 }}
        >
          {isAIEditing ? <CircularProgress /> : "Generate"}
        </Button>
      </Box>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Card sx={modalStyle}>
          <Box sx={modalContentStyle}>
            <Card sx={{ backgroundColor: "primary" }}>
              <Typography
                sx={{ p: 2 }}
                id="modal-modal-title"
                variant="h6"
                component="h2"
              >
                Changes
              </Typography>
            </Card>
            <Card
              id="modal-modal-description"
              sx={{ mt: 2, p: 2, minHeight: "200px" }}
              dangerouslySetInnerHTML={{ __html: formatDifferences(diffs) }}
            />
          </Box>
          <Box sx={modalFooterStyle}>
            <Button
              onClick={saveChanges}
              variant="contained"
              sx={{ width: "100%" }}
            >
              Save Changes
            </Button>
          </Box>
        </Card>
      </Modal>
    </Box>
  );
};
