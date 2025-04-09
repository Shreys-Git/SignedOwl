import React from "react";
import { Box, Card, CardContent, Typography, Chip } from "@mui/material";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";

type StatCardProps = {
  title: string;
  value: string;
  delta: number;
  icon: React.ReactNode;
};

export const StatCard = ({ title, value, delta, icon }: StatCardProps) => {
  const renderDelta = () => {
    if (delta === 0) return null;

    const Icon = delta > 0 ? TrendingUpIcon : TrendingDownIcon;
    const color = delta > 0 ? "success" : "error";

    return (
      <Chip
        icon={<Icon />}
        label={`${Math.abs(delta)}%`}
        size="small"
        color={color}
        variant="outlined"
      />
    );
  };

  return (
    <Card
      sx={{
        width: "100%",
        transition: "0.3s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box
          sx={{
            mb: 2,
            display: "flex",
            alignItems: "center",
            gap: 1,
          }}
        >
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.5px",
            }}
          >
            {title}
          </Typography>
          <Box
            sx={{
              bgcolor: "secondary",
              borderRadius: 1,
              p: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {React.cloneElement(icon as React.ReactElement, {
              sx: { color: "primary.main", fontSize: 20 },
            })}
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 700,
              color: "text.primary",
              lineHeight: 1.2,
            }}
          >
            {value}
          </Typography>
          {renderDelta()}
        </Box>
      </CardContent>
    </Card>
  );
};
