import { Box } from "@mui/material";
import { TopBar } from "../components/common/TopBar";
import { Kanban } from "../components/kanban/Kanban";
import { SideBar } from "../components/common/SideBar";

export const KanbanPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Kanban />
      </Box>
    </Box>
  );
};
