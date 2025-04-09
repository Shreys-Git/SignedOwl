import { Box } from "@mui/material";
import { PageHeader } from "../common/PageHeader";
import NavFileGrid from "./NavFileGrid";
import { StatCard } from "../common/StatCard";
import { useState } from "react";

export type Stat = {
  title: string;
  value: string;
  delta: number;
  icon: React.ReactNode;
};

export const Files = () => {
  const [fileStats, setFileStats] = useState<Stat[]>([]);
  return (
    <Box>
      <PageHeader title={"Files"} description={"Documents turned to Data"} />
      <Box
        display={"flex"}
        mx={2}
        my={0}
        gap={1}
        position={"relative"}
        zIndex={1}
      >
        {fileStats.map((stat) => (
          <StatCard
            title={stat.title}
            value={stat.value}
            delta={stat.delta}
            icon={stat.icon}
          />
        ))}
      </Box>
      <NavFileGrid setFileStats={setFileStats} />
    </Box>
  );
};
