import React, { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  Typography,
  Box,
  CircularProgress,
  Chip,
  Stack,
  Modal,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import WarningIcon from "@mui/icons-material/Warning";
import ReactMarkdown from "react-markdown";

/** N.B: The interface matches the backend's expected API model 
changes made here need updates to the backend */
interface Insight {
  insight_type: "clause" | "obligation";
  explanation: string;
  extraction: string;
  document_lookup: boolean;
  deviation: boolean;
  insight_generated: string;
}

interface InsightsProps {
  agreement: string;
}

export const Insights: React.FC<InsightsProps> = ({ agreement }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedInsight, setSelectedInsight] = useState<Insight | null>(null);

  const modalStyle = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "80%",
    maxWidth: 600,
    maxHeight: "90vh",
    overflow: "auto",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
  };

  useEffect(() => {
    const fetchInsights = async () => {
      try {
        const response = await fetch(
          "http://localhost:8000/v1/documents/insights",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              insight_type: "obligation",
              agreement: agreement,
            }),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch insights");
        }

        const data = await response.json();
        setInsights(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    if (agreement && agreement !== "") {
      fetchInsights();
    }
  }, [agreement]);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="200px"
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box p={2}>
        <Typography color="error">{error}</Typography>
      </Box>
    );
  }

  return (
    <>
      <Stack spacing={2}>
        {insights.map((insight, index) => (
          <Card
            key={index}
            sx={{
              cursor: "pointer",
              "&:hover": {
                boxShadow: 6,
                transform: "translateY(-2px)",
                transition: "all 0.2s ease-in-out",
              },
            }}
            onClick={() => setSelectedInsight(insight)}
          >
            <CardContent>
              <Box sx={{ mb: 2 }}>
                <Chip
                  label={insight.insight_type}
                  color="primary"
                  size="small"
                  sx={{ mr: 1 }}
                />
                {insight.document_lookup && (
                  <Chip
                    icon={<SearchIcon />}
                    label="Needs Document Lookup"
                    size="small"
                    color="info"
                    sx={{ mr: 1 }}
                  />
                )}
                {insight.deviation && (
                  <Chip
                    icon={<WarningIcon />}
                    label="Deviation Detected"
                    size="small"
                    color="warning"
                  />
                )}
              </Box>
              <Typography variant="h6" gutterBottom>
                Explanation
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                {insight.explanation}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Extracted Text:</strong>{" "}
                {insight.extraction.substring(0, 100)}
                {insight.extraction.length > 100 && "..."}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>

      <Modal
        open={Boolean(selectedInsight)}
        onClose={() => setSelectedInsight(null)}
        aria-labelledby="insight-modal-title"
      >
        <Box sx={modalStyle}>
          {selectedInsight && (
            <>
              <Box sx={{ mb: 3 }}>
                <Chip
                  label={selectedInsight.insight_type}
                  color="primary"
                  sx={{ mr: 1 }}
                />
                {selectedInsight.document_lookup && (
                  <Chip
                    icon={<SearchIcon />}
                    label="Needs Document Lookup"
                    color="info"
                    sx={{ mr: 1 }}
                  />
                )}
                {selectedInsight.deviation && (
                  <Chip
                    icon={<WarningIcon />}
                    label="Deviation Detected"
                    color="warning"
                  />
                )}
              </Box>

              <Typography variant="h6" gutterBottom>
                {selectedInsight.insight_type}
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedInsight.extraction}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Explanation
              </Typography>
              <Typography variant="body1" paragraph>
                {selectedInsight.explanation}
              </Typography>

              <Typography variant="h6" gutterBottom>
                Generated Insight
              </Typography>
              <Typography variant="body1">
                <ReactMarkdown>
                  {selectedInsight.insight_generated}
                </ReactMarkdown>
              </Typography>
            </>
          )}
        </Box>
      </Modal>
    </>
  );
};
