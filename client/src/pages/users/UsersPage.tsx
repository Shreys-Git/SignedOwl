import { Box } from "@mui/material";
import { UserGrid } from "../../components/users/UserGrid";
import { TopBar } from "../../components/common/TopBar";
import { Users } from "../../components/users/Users";
import { SideBar } from "../../components/common/SideBar";

export const UsersPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Users />
      </Box>
    </Box>
  );
};
