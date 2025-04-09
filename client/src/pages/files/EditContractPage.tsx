import { Box } from "@mui/material";
import { SideBar } from "../../components/common/SideBar";
import { TopBar } from "../../components/common/TopBar";
import { Files } from "../../components/files/Files";
import { AIContractDrafter } from "../../components/editor/AIContractDrafter";

export const EditContractPage = () => {
  return (
    <Box display="flex">
      <SideBar />
      <Box flexGrow={1}>
        <TopBar />
        <AIContractDrafter />
      </Box>
    </Box>
  );
};
