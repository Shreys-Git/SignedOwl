import { Box } from "@mui/material";
import { TopBar } from "../components/common/TopBar";
import { WorkflowCalendar } from "../components/calendar/Calender";
import { SideBar } from "../components/common/SideBar";

export const CalendarPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <WorkflowCalendar />
      </Box>
    </Box>
  );
};
