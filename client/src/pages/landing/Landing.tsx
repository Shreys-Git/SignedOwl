import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Grid,
  Toolbar,
  Typography,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import Divider from "@mui/material/Divider";
import DocumentScannerIcon from "@mui/icons-material/DocumentScanner";
import EditNoteIcon from "@mui/icons-material/EditNote";
import InsightsIcon from "@mui/icons-material/Insights";
import ChatIcon from "@mui/icons-material/Chat";
import AutoAwesomeIcon from "@mui/icons-material/AutoAwesome";
import AssessmentIcon from "@mui/icons-material/Assessment";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

export const Landing = () => {
  const features = [
    {
      title: "Categorization",
      description:
        "Extract fields automatically using Navigator API to sort and search documents efficiently.",
      icon: <DocumentScannerIcon />,
    },
    {
      title: "Smart Edits",
      description:
        "Streamline redlining and contract negotiations with AI agents that leverage document data.",
      icon: <EditNoteIcon />,
    },
    {
      title: "AI Insights",
      description:
        "Extract clauses, flag deviations, and prepare researched reports with proper citations.",
      icon: <InsightsIcon />,
    },
    {
      title: "AI Chat",
      description:
        "Query your documents through vector storage and semantic search for complex answers.",
      icon: <ChatIcon />,
    },
    {
      title: "Advanced Reports",
      description:
        "Get statistical insights into AI-extracted fields using Navigator API.",
      icon: <AssessmentIcon />,
    },
    {
      title: "Workflow Management",
      description:
        "Organize tasks with Kanban boards and Calendar integration for effective workload management.",
      icon: <DashboardIcon />,
    },
  ];

  const navigate = useNavigate();

  const handleUploadClick = () => {
    console.log("Clicking the button now");
    navigate("/reports");
  };

  return (
    <Box sx={{ flexGrow: 1, bgcolor: "#f8f9fa", minHeight: "100vh" }}>
      {/* Navigation */}
      <AppBar
        position="static"
        color="transparent"
        elevation={0}
        sx={{ bgcolor: "#fff" }}
      >
        <Toolbar>
          <Typography
            variant="h5"
            component="div"
            sx={{ flexGrow: 1, fontWeight: "bold", color: "#5138ee" }}
          >
            Signed<span style={{ color: "#333" }}>Owl</span>
          </Typography>
          <Button variant="text" sx={{ mr: 2, color: "#333" }}>
            Features
          </Button>
          <Button variant="text" sx={{ mr: 2, color: "#333" }}>
            Pricing
          </Button>
          <Button variant="text" sx={{ mr: 2, color: "#333" }}>
            Documentation
          </Button>
          <Button
            variant="contained"
            sx={{
              bgcolor: "#5138ee",
              "&:hover": {
                bgcolor: "#4128dd",
              },
            }}
            onClick={handleUploadClick}
          >
            Get Started
          </Button>
        </Toolbar>
      </AppBar>

      {/* Hero Section */}
      <Container maxWidth="lg">
        <Box sx={{ my: 8, textAlign: "center" }}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{ fontWeight: "bold" }}
          >
            Documents Turned to Data
          </Typography>
          <Typography
            variant="h6"
            component="p"
            sx={{ mb: 4, color: "#555", maxWidth: 700, mx: "auto" }}
          >
            Transform your legal document workflow with AI-powered extraction,
            analysis, and management tools.
          </Typography>
          <Button
            variant="contained"
            size="large"
            startIcon={<AutoAwesomeIcon />}
            sx={{
              bgcolor: "#5138ee",
              py: 1.5,
              px: 4,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#4128dd",
              },
            }}
            onClick={handleUploadClick}
          >
            Get Started
          </Button>
        </Box>
        <Divider flexItem sx={{ p: 2 }} />

        {/* Features */}
        <Box sx={{ my: 8 }}>
          <Typography
            variant="h4"
            component="h2"
            gutterBottom
            sx={{ fontWeight: "bold", mb: 4, textAlign: "center" }}
          >
            Key Features
          </Typography>
          <Grid container spacing={4}>
            {features.map((feature, index) => (
              <Grid item xs={12} md={6} lg={4} key={index}>
                <Card
                  elevation={0}
                  sx={{
                    bgcolor: "#fff",
                    borderRadius: 2,
                    height: "100%",
                    transition: "transform 0.3s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                      boxShadow: "0px 10px 20px rgba(0,0,0,0.1)",
                    },
                  }}
                >
                  <CardContent sx={{ p: 4 }}>
                    <Typography
                      variant="h6"
                      component="div"
                      fontWeight="bold"
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                      }}
                    >
                      <Box
                        sx={{
                          color: "#5138ee",
                          display: "flex",
                          mr: 1,
                        }}
                      >
                        {feature.icon}
                      </Box>
                      {feature.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {feature.description}
                    </Typography>
                    <Button
                      endIcon={<ArrowForwardIcon />}
                      sx={{ mt: 2, color: "#5138ee", p: 0 }}
                    >
                      Learn more
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* CTA Section */}
        <Box
          sx={{
            my: 8,
            p: 6,
            bgcolor: "#5138ee",
            borderRadius: 4,
            color: "white",
            textAlign: "center",
          }}
        >
          <Typography
            variant="h4"
            component="div"
            gutterBottom
            fontWeight="bold"
          >
            Ready to transform your document workflow?
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, maxWidth: 700, mx: "auto" }}>
            Join thousands of businesses using SignedOwl to streamline document
            management and extract valuable insights.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "white",
              color: "#5138ee",
              py: 1.5,
              px: 4,
              borderRadius: 2,
              "&:hover": {
                bgcolor: "#f0f0f0",
              },
            }}
            onClick={handleUploadClick}
          >
            Get Started Free
          </Button>
        </Box>
      </Container>

      {/* Footer */}
      <Box sx={{ bgcolor: "#fff", p: 4, mt: 4 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Typography
                variant="h6"
                component="div"
                sx={{ fontWeight: "bold", color: "#5138ee", mb: 2 }}
              >
                SignedOwl
              </Typography>
              <Typography variant="body2" color="text.secondary">
                AI-powered document management platform that turns your
                documents into actionable data.
              </Typography>
            </Grid>
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Product
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Features
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Pricing
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    API
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Resources
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Documentation
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Guides
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    API Reference
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Company
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    About
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Blog
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Careers
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={3}>
                  <Typography
                    variant="subtitle1"
                    component="div"
                    sx={{ fontWeight: "bold", mb: 2 }}
                  >
                    Legal
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Privacy
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Terms
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ mb: 1 }}>
                    Security
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mt: 4, textAlign: "center" }}
          >
            © {new Date().getFullYear()} SignedOwl. All rights reserved.
          </Typography>
        </Container>
      </Box>
    </Box>
  );
};
