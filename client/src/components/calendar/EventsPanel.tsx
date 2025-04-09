import { formatDate } from "@fullcalendar/core/index.js";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Card,
  IconButton,
} from "@mui/material";
import { CalendarEvent } from "./Calender";
import GoogleIcon from "@mui/icons-material/Google";

interface EventsProps {
  events: CalendarEvent[];
}

export const EventsPanel = ({ events }: EventsProps) => {
  // Sort events by date in descending order (most recent first)
  const sortedEvents = [...(events || [])].sort((a, b) => {
    const dateA = new Date(a.start).getTime();
    const dateB = new Date(b.start).getTime();
    return dateB - dateA;
  });

  const handleGoogleSubmit = () => {};
  return (
    <Card
      sx={{
        flex: "1 1 20%",
        p: "15px",
        borderRadius: "4px",
        height: "80vh",
        overflow: "auto",
      }}
    >
      <Box
        sx={{
          background: "#dddbff",
          color: "black",
          padding: "16px 24px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          Upcoming Deadlines
        </Typography>
        <IconButton>
          <GoogleIcon onClick={handleGoogleSubmit} sx={{ color: "#4285F4" }} />
        </IconButton>
      </Box>
      <List>
        {sortedEvents.map((event) => (
          <ListItem key={event.event_id}>
            <ListItemText
              primary={<Typography variant="h6">{event.title}</Typography>}
              secondary={
                <Typography>
                  {event.description} —{" "}
                  {formatDate(new Date(event.start), {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })}
                </Typography>
              }
            />
          </ListItem>
        ))}
      </List>
    </Card>
  );
};
