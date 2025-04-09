import React, { useState, useCallback } from "react";
import {
  Button,
  Paper,
  Typography,
  Box,
  CircularProgress,
} from "@mui/material";
import { useDropzone } from "react-dropzone";

{
  /** File Upload is disabled until Docusign's Navigator API is
   * publically availble and API-accessible for uploads
   */
}
type UploadedFile = {
  name: string;
  content: string;
};

interface FileUploadProps {
  setFiles: React.Dispatch<React.SetStateAction<File[] | null>>;
}

export const FileDropArea: React.FC<FileUploadProps> = ({ setFiles }) => {
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [droppedFiles, setDroppedFiles] = useState<string[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((uploadedFile) => {
      if (uploadedFile) {
        if (
          uploadedFile.type === "application/pdf" ||
          uploadedFile.type ===
            "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        ) {
          setFiles((prevFiles) => [...(prevFiles ?? []), uploadedFile]);
          setDroppedFiles((prev) => [...prev, uploadedFile.name]);
        } else {
          alert("Please upload only PDF or DOCX files");
        }
      }
    });
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "application/pdf": [".pdf"],
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
        [".docx"],
    },
    multiple: false,
  });

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 500, mx: "auto" }}>
      <Typography paddingBottom="1rem">Upload PDF or DOCX Files</Typography>

      <Box
        {...getRootProps()}
        sx={{
          border: "2px dashed",
          borderColor: isDragActive ? "primary.main" : "grey.300",
          borderRadius: 1,
          p: 3,
          mb: 2,
          textAlign: "center",
          cursor: "pointer",
        }}
      >
        <input {...getInputProps()} />
        <Typography padding="1rem">
          {isDragActive
            ? "Drop the file here..."
            : "Drag & drop files here, or click to select"}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          (Only PDF and DOCX files are accepted)
        </Typography>
      </Box>

      {file && (
        <Typography variant="body2" sx={{ mb: 2 }}>
          Selected file: {file.name}
        </Typography>
      )}

      {/** File Upload is disabled until Docusign's Navigator API is
       * publically availble and API-accessible for uploads
       */}
      {/* <Button
        variant="contained"
        onClick={handleUpload}
        disabled={!file || loading}
        fullWidth
        sx={{ mb: 2 }}
      >
        {loading ? <CircularProgress size={24} /> : "Upload"}
      </Button> */}

      <Typography paddingTop="1rem">Uploaded Files:</Typography>
      <Box component="ul" sx={{ mt: 1, pl: 2 }}>
        {droppedFiles.map((fileName, index) => (
          <li key={index}>{fileName}</li>
        ))}
      </Box>
    </Paper>
  );
};
