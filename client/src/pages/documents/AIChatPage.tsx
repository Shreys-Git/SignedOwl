import { Box } from "@mui/material";
import { ChatScreen } from "../../components/chat/ChatScreen";
import { TopBar } from "../../components/common/TopBar";
import { SideBar } from "../../components/common/SideBar";

export const AIChatPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <ChatScreen />
      </Box>
    </Box>
  );
};
