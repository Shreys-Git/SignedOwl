import { Box, Typography } from "@mui/material";

export const Branding = () => {
  return (
    <Box display="flex" alignItems="flex-end" marginBottom={2} pt={1}>
      <Typography
        variant="h5"
        component="div"
        sx={{ flexGrow: 1, fontWeight: "bold", color: "#5138ee" }}
      >
        Signed<span style={{ color: "#333" }}>Owl</span>
      </Typography>
    </Box>
  );
};
