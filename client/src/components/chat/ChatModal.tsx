import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Modal,
  Typography,
} from "@mui/material";
import { useState, useEffect } from "react";
import { FileDropArea } from "../common/FileDropArea";
import axios from "axios";
import Select from "react-select";
import { Agreement } from "../files/NavFileGrid";

type ChatModalProps = {
  currentFileIDs: string[];
  setFileIDs: React.Dispatch<React.SetStateAction<string[]>>;
  setIsChatSetup: React.Dispatch<React.SetStateAction<boolean>>;
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
  maxHeight: "90vh",
  padding: "1rem",
};

const modalFooterStyle = {
  borderTop: "1px solid #ddd",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
};

type FileOption = {
  value: string;
  label: string;
};
export const ChatModal = ({
  currentFileIDs,
  setFileIDs,
  setIsChatSetup,
}: ChatModalProps) => {
  const [files, setFiles] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [open, setOpen] = useState(true);
  const [fileOptions, setFileOptions] = useState<FileOption[]>([]);
  const [selectedAgreementIDs, setSelectedAgreementIDs] = useState<string[]>(
    []
  );

  const handleClose = () => setOpen(false);

  const handleAgreementChange = (selectedOptions: any) => {
    console.log(selectedOptions);
    setSelectedAgreementIDs(
      selectedOptions ? selectedOptions.map((option: any) => option.value) : []
    );
  };

  const saveChanges = async () => {
    const uploadAdditionalDocs = async () => {
      setIsUploading(true);
      const formData = new FormData();

      // Append additional files if any
      if (files) {
        files.forEach((file) => formData.append("additional_docs", file));
      }

      try {
        const response = await axios.post(
          "http://localhost:8000/v1/converse/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (response.status === 200) {
          console.log("Upload Response is: ", response.data);
          // Add the ids from the response
          setFileIDs((prevIds) => [...prevIds, ...response.data]);
          setFileIDs((prevIds) => [...prevIds, ...selectedAgreementIDs]);
        } else {
          console.error("Unexpected response:", response);
        }
      } catch (error) {
        console.error("Error during POST request:", error);
      }
      setIsUploading(false);
    };

    await uploadAdditionalDocs();
    setIsChatSetup(true);
  };

  // Fetch agreements data
  useEffect(() => {
    const fetchAgreements = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/v1/documents/files/ALL/LATEST"
        );
        if (response.status === 200) {
          console.log("All Files:", response.data);
          const agreementsData = response.data.map((agreement: Agreement) => ({
            value: agreement.document_id,
            label: agreement.navigator_extractions.file_name,
          }));
          console.log("Agreement Data", agreementsData);
          setFileOptions(agreementsData);
        } else {
          console.error("Failed to fetch agreements");
        }
      } catch (error) {
        console.error("Error fetching agreements:", error);
      }
    };
    fetchAgreements();
  }, []);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography
          variant="h5"
          sx={{
            color: "text.secondary",
            fontWeight: 500,
            textTransform: "uppercase",
            letterSpacing: "0.5px",
          }}
        >
          Documents
        </Typography>
        <Typography variant="body1" sx={{ color: "text.secondary" }}>
          Add the documents you would like to converse with
        </Typography>
        <Divider sx={{ margin: 1.5 }} />
        <Select
          isMulti
          name="agreements"
          options={fileOptions}
          value={fileOptions.filter((agreement) =>
            selectedAgreementIDs.includes(agreement.value)
          )}
          onChange={handleAgreementChange}
          placeholder="Select Agreements"
        />
        <FileDropArea setFiles={setFiles} />
        <Box sx={modalFooterStyle}>
          <Button
            onClick={saveChanges}
            variant="contained"
            color="primary"
            sx={{ width: "100%" }}
            disabled={isUploading}
          >
            {isUploading ? <CircularProgress /> : "Begin Chat"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
