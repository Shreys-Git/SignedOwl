import { Box } from "@mui/material";
import { Report } from "../../components/reports/Report";
import { TopBar } from "../../components/common/TopBar";
import { SideBar } from "../../components/common/SideBar";

export const ReportPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />

        <Report />
      </Box>
    </Box>
  );
};
