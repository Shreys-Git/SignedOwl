import { Box, Button } from "@mui/material";

export const UserActions = () => {
  return (
    <Box display="flex" flexGrow={1} justifyContent="flex-end">
      <Button>Add</Button>
      <Button>Edit</Button>
      <Button>Delete</Button>
    </Box>
  );
};
