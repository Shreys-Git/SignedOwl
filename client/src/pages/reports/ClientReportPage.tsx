import { Box } from "@mui/material";
import { Report } from "../../components/reports/Report";
import { TopBar } from "../../components/common/TopBar";
import { SideBar } from "../../components/common/SideBar";

export const ClientReportPage = () => {
  return (
    <Box display="flex" sx={{ backgroundColor: "#f5f5f5" }}>
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Report />
      </Box>
    </Box>
  );
};
