import { Box, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";

type UserChatInputProps = {
  userInput: string;
  setUserInput: React.Dispatch<React.SetStateAction<string>>;
  setIsNewInputAvailable: React.Dispatch<React.SetStateAction<boolean>>;
};

export const UserChatInput = ({
  userInput,
  setUserInput,
  setIsNewInputAvailable,
}: UserChatInputProps) => {
  const handleUserInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUserInput(event.target.value);
  };

  const handleUserInputSubmit = () => {
    setIsNewInputAvailable(true);
  };

  return (
    <Box sx={{ position: "relative", width: "100%" }}>
      <TextField
        id="outlined-basic"
        label="Your Question..."
        variant="outlined"
        value={userInput}
        onChange={handleUserInputChange}
        sx={{ width: "100%" }}
      />
      <IconButton
        onClick={handleUserInputSubmit}
        color="secondary"
        sx={{
          position: "absolute",
          right: "8px",
          top: "50%",
          transform: "translateY(-50%)",
          backgroundColor: "#2f27ce",
          "&:hover": {
            color: "white",
            backgroundColor: "#dddbff",
          },
        }}
      >
        <SendIcon />
      </IconButton>
    </Box>
  );
};
