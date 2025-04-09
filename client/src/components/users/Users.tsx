import { Box } from "@mui/material";
import { UserGrid } from "./UserGrid";
import { UserActions } from "./UserActions";

export const Users = () => {
  return (
    <Box>
      <UserActions />
      <UserGrid />
    </Box>
  );
};
