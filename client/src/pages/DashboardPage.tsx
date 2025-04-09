import { Box } from "@mui/material";
import { TopBar } from "../components/common/TopBar";
import { SideBar } from "../components/common/SideBar";

export const DashboardPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
      </Box>
    </Box>
  );
};
