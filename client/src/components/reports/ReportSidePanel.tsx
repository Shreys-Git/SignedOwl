import {
  Box,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  styled,
} from "@mui/material";

interface Props {
  categoryFrequencies: CategoryCount[];
}

export interface CategoryCount {
  category: string;
  frequency: number;
}

// Styled components
const StyledCard = styled(Card)(() => ({
  minWidth: 300,
  height: "100%",
  backgroundColor: "#1a1f2e",
  color: "#fff",
  borderRadius: 0,
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  padding: theme.spacing(2),
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.05)",
  },
  "&:not(:last-child)": {
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
  },
  transition: "background-color 0.2s ease",
}));

export const CategoryFrequenciesPanel = ({ categoryFrequencies }: Props) => {
  return (
    <StyledCard elevation={3}>
      <StyledHeader>
        <Typography variant="h6" component="div" sx={{ color: "#fff" }}>
          Category Frequencies
        </Typography>
      </StyledHeader>
      <CardContent sx={{ p: 0 }}>
        {categoryFrequencies.length === 0 ? (
          <Box
            sx={{
              p: 2,
              textAlign: "center",
              color: "rgba(255, 255, 255, 0.5)",
            }}
          >
            No categories found
          </Box>
        ) : (
          <List disablePadding>
            {categoryFrequencies.map((item: any, index: number) => (
              <StyledListItem key={index} disablePadding>
                <ListItemText
                  primary={
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Typography
                        variant="body2"
                        sx={{
                          color: "rgba(255, 255, 255, 0.8)",
                          fontWeight: 500,
                        }}
                      >
                        {item.category}
                      </Typography>
                      <Typography
                        variant="h6"
                        sx={{ color: "#fff", fontWeight: 600 }}
                      >
                        {item.frequency}
                      </Typography>
                    </Box>
                  }
                />
              </StyledListItem>
            ))}
          </List>
        )}
      </CardContent>
    </StyledCard>
  );
};
