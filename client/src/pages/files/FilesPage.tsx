import { Box } from "@mui/material";
import { SideBar } from "../../components/common/SideBar";
import { TopBar } from "../../components/common/TopBar";
import { Files } from "../../components/files/Files";

export const FilesPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <Files />
      </Box>
    </Box>
  );
};
