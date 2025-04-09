import { Box, Typography } from "@mui/material";

type PageHeaderProps = {
  title: string;
  description: string;
};
export const PageHeader = ({ title, description }: PageHeaderProps) => {
  return (
    <Box
      sx={{
        background: "linear-gradient(to bottom, #1a1f2e, #2d3446)",
        color: "white",
        px: 4,
        paddingBottom: 12,
        position: "relative",
        marginBottom: -8,
        zIndex: 0,
      }}
    >
      <Typography variant="h3">{title}</Typography>
      <Typography variant="h6">{description}</Typography>
    </Box>
  );
};
