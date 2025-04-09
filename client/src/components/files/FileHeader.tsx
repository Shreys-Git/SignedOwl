import { Box, Button, Card, Typography, Stack } from "@mui/material";
import FileUploadIcon from "@mui/icons-material/FileUpload";

export const FileHeader = () => {
  return (
    <Card
      sx={{
        p: 3,
        mb: 1,
        mt: 4,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        boxShadow: 2,
        background: (theme) =>
          `linear-gradient(45deg, ${theme.palette.background.paper} 30%, ${theme.palette.grey[50]} 90%)`,
      }}
    >
      <Stack spacing={0.5}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              letterSpacing: "-0.5px",
            }}
          >
            AI Extractions
          </Typography>
          <Box
            sx={{
              px: 1,
              py: 0.5,
              borderRadius: 1,
              bgcolor: "primary.main",
              color: "primary.contrastText",
              fontSize: "0.75rem",
              fontWeight: 500,
            }}
          >
            BETA
          </Box>
        </Box>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
          }}
        >
          Extractions from Navigator API
        </Typography>
      </Stack>

      <Button
        variant="contained"
        startIcon={<FileUploadIcon />}
        sx={{
          px: 3,
          py: 1,
          fontWeight: 600,
          textTransform: "none",
          borderRadius: 1.5,
          "&:hover": {
            boxShadow: 3,
          },
        }}
      >
        Upload File
      </Button>
    </Card>
  );
};
