import React, { useState, useRef, MouseEvent, ChangeEvent } from "react";
import {
  AppBar,
  Toolbar,
  Paper,
  Select,
  MenuItem,
  IconButton,
  Button,
  Typography,
  Box,
  Popper,
  Card,
  CardContent,
  CardActions,
  TextField,
} from "@mui/material";
import {
  FormatBold,
  FormatItalic,
  FormatUnderlined,
  NotificationsActive,
} from "@mui/icons-material";
import { styled } from "@mui/material/styles";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import SaveIcon from "@mui/icons-material/Save";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SignModal } from "../files/SignModal";

type EditAreaProps = {
  editorContent: string;
  setEditorContent: React.Dispatch<React.SetStateAction<string>>;
};

// Styled components
const EditorContainer = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: "20px auto",
  padding: theme.spacing(3),
}));

const ToolbarButton = styled(IconButton)<{ selected: boolean }>(
  ({ theme, selected }) => ({
    marginRight: theme.spacing(1),
    backgroundColor: selected ? theme.palette.action.selected : "transparent",
  })
);

const StyledSelect = styled(Select)(({ theme }) => ({
  marginRight: theme.spacing(2),
  minWidth: 120,
}));

const TextEditArea = ({ editorContent, setEditorContent }: EditAreaProps) => {
  const params = useParams();
  const [isSignModalVisible, setIsSignModalVisible] = useState(false);
  const [isTooltipVisible, setIsTooltipVisible] = useState<boolean>(false);
  const [selectedFont, setSelectedFont] = useState<string>("Arial");
  const [fontSize, setFontSize] = useState<string>("16");
  const [isBold, setIsBold] = useState<boolean>(false);
  const [isItalic, setIsItalic] = useState<boolean>(false);
  const [isUnderline, setIsUnderline] = useState<boolean>(false);
  const [selectedText, setSelectedText] = useState<string>("");

  const contentRef = useRef<HTMLDivElement | null>(null);

  const handleTextSelection = () => {
    const selection = window.getSelection();
    const selectedText = selection?.toString().trim() || "";
    setSelectedText(selectedText);
  };

  // Handle changes in the text field
  const handleTextChange = (event: ChangeEvent<HTMLInputElement>): void => {
    setEditorContent(event.target.value);
  };

  const fonts: string[] = ["Arial", "Times New Roman", "Courier New"];

  const fontSizes: string[] = ["12", "14", "16", "18", "20"];

  const saveFile = () => {
    axios.post(
      "http://localhost:8000/v1/documents/files/" + params.documentId,
      { document_text: editorContent }
    );
  };

  const signFile = () => {
    // Open a Modal that lets people add a message
    setIsSignModalVisible(true);
    // and select a person to sign ( add the backend for it )
  };

  return (
    <>
      {isSignModalVisible && (
        <SignModal
          editorContent={editorContent}
          isSignModalVisible={isSignModalVisible}
          setIsSignModalVisible={setIsSignModalVisible}
        />
      )}
      <EditorContainer elevation={2}>
        <AppBar position="static" color="default" elevation={0}>
          <Toolbar variant="dense">
            <Box display="flex" alignItems="center" flexGrow={1}>
              <StyledSelect
                value={selectedFont}
                onChange={(e) => setSelectedFont(e.target.value as string)}
                size="small"
              >
                {fonts.map((font) => (
                  <MenuItem key={font} value={font}>
                    {font}
                  </MenuItem>
                ))}
              </StyledSelect>

              <StyledSelect
                value={fontSize}
                onChange={(e) => setFontSize(e.target.value as string)}
                size="small"
              >
                {fontSizes.map((size) => (
                  <MenuItem key={size} value={size}>
                    {size}px
                  </MenuItem>
                ))}
              </StyledSelect>

              <ToolbarButton
                selected={isBold}
                onClick={() => setIsBold(!isBold)}
                size="small"
              >
                <FormatBold />
              </ToolbarButton>

              <ToolbarButton
                selected={isItalic}
                onClick={() => setIsItalic(!isItalic)}
                size="small"
              >
                <FormatItalic />
              </ToolbarButton>

              <ToolbarButton
                selected={isUnderline}
                onClick={() => setIsUnderline(!isUnderline)}
                size="small"
              >
                <FormatUnderlined />
              </ToolbarButton>
            </Box>

            <Box display="flex">
              <Button
                variant="contained"
                color="secondary"
                startIcon={<SaveIcon />}
                onClick={saveFile}
                sx={{ mr: 1 }}
              >
                Save
              </Button>
              <Button
                variant="contained"
                color="secondary"
                startIcon={<HistoryEduIcon />}
                onClick={signFile}
                sx={{ mr: 1 }}
              >
                Sign
              </Button>
            </Box>
          </Toolbar>
        </AppBar>

        <Box
          ref={contentRef}
          onMouseUp={handleTextSelection}
          sx={{
            mt: 2,
            fontFamily: selectedFont,
            fontSize: `${fontSize}px`,
            fontWeight: isBold ? "bold" : "normal",
            fontStyle: isItalic ? "italic" : "normal",
            textDecoration: isUnderline ? "underline" : "none",
          }}
        >
          <TextField
            value={editorContent}
            onChange={handleTextChange}
            multiline
            fullWidth
            variant="outlined"
            placeholder="Type something..."
            InputProps={{
              sx: {
                "& fieldset": {
                  border: "none", // Removes the border
                },
              },
            }}
            sx={{
              "& .MuiInputBase-root": {
                fontSize: "16px",
                lineHeight: 1.5,
                fontFamily: "Roboto, sans-serif",
                padding: 0, // Adjust padding if needed
              },
              "& .MuiInputBase-input": {
                backgroundColor: "transparent",
                outline: "none", // Removes the selection focus outline
              },
              "&:hover .MuiOutlinedInput-notchedOutline": {
                border: "none", // Prevent border reappearance on hover
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                border: "none", // Prevent border reappearance when focused
              },
            }}
          />
        </Box>
      </EditorContainer>
    </>
  );
};

export default TextEditArea;
