import {
  Modal,
  Box,
  TextField,
  Button,
  CircularProgress,
  Typography,
} from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select, { MultiValue } from "react-select";

type SignModalProps = {
  editorContent: string;
  isSignModalVisible: boolean;
  setIsSignModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

type SelectOption = {
  value: string;
  label: string;
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
  padding: "1rem",
};

const modalFooterStyle = {
  borderTop: "1px solid #ddd",
  padding: "8px",
  display: "flex",
  justifyContent: "center",
  backgroundColor: "#f9f9f9",
};

export const SignModal = ({
  editorContent,
  isSignModalVisible,
  setIsSignModalVisible,
}: SignModalProps) => {
  const params = useParams();
  // State for the subject input
  const [approverOptions, setApproverOptions] = useState<SelectOption[]>([]);
  const [ccOptions, setCcOptions] = useState<SelectOption[]>([]);
  const [subject, setSubject] = useState<string>("");
  const [isSending, setIsSending] = useState<boolean>(false);

  // State for the approver (single selection)
  const [selectedApprovers, setSelectedApprovers] = useState<
    MultiValue<SelectOption>
  >([]);

  // State for the CCs (multiple selection)
  const [selectedCCs, setSelectedCCs] = useState<MultiValue<SelectOption>>([]);

  const handleClose = () => setIsSignModalVisible(false);

  const handleSubmit = async () => {
    if (!subject || !selectedApprovers) {
      alert("Please fill in all required fields.");
      return;
    }

    // Construct the body for the Docusign POST request
    const requestBody = {
      document_id: params.documentId,
      subject,
      file_name: "Legal_Document.pdf",
      file_content: editorContent,
      primary_users: selectedApprovers.map((selectedApprover) => ({
        first_name: selectedApprover.label.split(" ")[0] || "First",
        last_name: selectedApprover.label.split(" ")[1] || "Last",
        email: selectedApprover.value,
      })),
      cc_users: selectedCCs.map((cc) => ({
        first_name: cc.label.split(" ")[0] || "First",
        last_name: cc.label.split(" ")[1] || "Last",
        email: cc.value,
      })),
    };
    try {
      setIsSending(true);
      const response = await axios.post(
        "http://localhost:8000/v1/documents/sign",
        requestBody
      );
      if (response.status == 200) {
        console.log(response.data);
        // Send this to the Document Status backend to update the data
      }
      setIsSending(false);
      handleClose();
    } catch (error: any) {
      alert(
        error.response?.data?.message || "An error occurred. Please try again."
      );
    }
    handleClose();
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/users");
        if (response.status === 200) {
          const userSelectOptions = response.data.map((user: any) => ({
            value: user.email, // Assuming 'email' is a field in the user object
            label: `${user.first_name} ${user.last_name}`, // Adjust this based on your user object structure
          }));
          setApproverOptions(userSelectOptions);
          setCcOptions(userSelectOptions);
        }
      } catch (error) {
        console.log("Could not fetch users", error);
      }
      return []; // Return an empty array if the request fails
    };

    fetchUsers();
  }, []);
  return (
    <Modal
      open={isSignModalVisible}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalStyle}>
        <Typography pb={1} variant="h5" fontWeight={400}>
          Send to Sign
        </Typography>
        {/* Subject Input */}
        <TextField
          id="subject-input"
          label="Subject"
          variant="standard"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          sx={{ marginBottom: "16px" }}
        />

        {/* Approver Dropdown */}
        <Select
          options={approverOptions}
          placeholder="Select Approver(s)"
          isMulti
          isSearchable
          onChange={(options) => setSelectedApprovers(options || [])}
          value={selectedApprovers}
          styles={{ container: (base) => ({ ...base, marginBottom: "16px" }) }}
        />

        {/* CCs Dropdown */}
        <Select
          options={ccOptions}
          placeholder="Select CC(s)"
          isMulti
          isSearchable
          onChange={(options) => setSelectedCCs(options || [])}
          value={selectedCCs}
        />

        {/* Modal Footer */}
        <Box sx={modalFooterStyle}>
          <Button
            onClick={handleSubmit}
            variant="contained"
            color="primary"
            disabled={isSending}
            sx={{ width: "100%" }}
          >
            {isSending ? <CircularProgress /> : "Send to Sign"}
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};
