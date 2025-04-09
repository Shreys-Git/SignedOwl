import React, { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import {
  CalendarOptions,
  DateSelectArg,
  EventClickArg,
} from "@fullcalendar/core";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import listPlugin from "@fullcalendar/list";
import interactionPlugin from "@fullcalendar/interaction";
import {
  Box,
  Typography,
  Modal,
  Button,
  TextField,
  Paper,
} from "@mui/material";
import axios from "axios";
import { EventsPanel } from "./EventsPanel";

export interface CalendarEvent {
  event_id: string;
  document_id: string;
  title: string;
  description: string;
  start: string;
  end?: string;
  allDay?: boolean;
}

export const WorkflowCalendar: React.FC = () => {
  const [events, setEvents] = useState<CalendarEvent[]>([]);
  const [openAddModal, setOpenAddModal] = useState(false);
  const [newEvent, setNewEvent] = useState<Partial<CalendarEvent>>({});

  // Fetch all events from the backend
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await axios.get<CalendarEvent[]>(
          "http://localhost:8000/v1/calendar"
        );
        setEvents(response.data || []);
      } catch (error) {
        console.error("Failed to fetch events", error);
      }
    };
    fetchEvents();
  }, []);

  // Add a new event
  const handleAddEvent = async () => {
    // Ensure the `newEvent` is fully populated with default values if fields are missing
    const eventToAdd: CalendarEvent = {
      ...newEvent,
      event_id: crypto.randomUUID(),
      document_id: "",
      title: newEvent.title || "Untitled Event",
      description: newEvent.description || "No description provided",
      start: newEvent.start || new Date().toISOString(), // Fallback to current date if `start` is missing
      end: newEvent.end || newEvent.start || new Date().toISOString(), // Use `start` as `end` if missing
      allDay: newEvent.allDay ?? true, // Default to `allDay: true` if not specified
    };

    try {
      const response = await axios.post<CalendarEvent>(
        "http://localhost:8000/v1/calendar",
        eventToAdd
      );
      setEvents((prevEvents) => [...prevEvents, response.data]);
      setOpenAddModal(false);
      setNewEvent({});
    } catch (error) {
      console.error("Failed to add event", error);
    }
  };

  // Handle a date click in the calendar to create a new event
  const handleDateClick = (selected: DateSelectArg) => {
    setNewEvent({
      start: selected.startStr,
      end: selected.endStr,
      allDay: selected.allDay,
    });
    setOpenAddModal(true);
  };

  // Handle an event click to delete the selected event
  const handleEventClick = async (selected: EventClickArg) => {
    const confirmDelete = window.confirm(
      `Delete event '${selected.event.title}'?`
    );
    if (confirmDelete) {
      try {
        const eventId = selected.event.extendedProps.event_id; // Use `extendedProps.event_id`
        if (eventId) {
          await axios.delete(`http://localhost:8000/v1/calendar/${eventId}`);
          setEvents((prevEvents) =>
            prevEvents.filter((event) => event.event_id !== eventId)
          );
          selected.event.remove();
        }
      } catch (error) {
        console.error("Failed to delete event", error);
      }
    }
  };

  const calendarOptions: CalendarOptions = {
    height: "75vh",
    plugins: [dayGridPlugin, timeGridPlugin, interactionPlugin, listPlugin],
    headerToolbar: {
      left: "prev,next today",
      center: "title",
      right: "dayGridMonth,timeGridWeek,timeGridDay,listMonth",
    },
    initialView: "dayGridMonth",
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    select: handleDateClick,
    eventClick: handleEventClick,
    events: events,
  };

  return (
    <>
      <Box m="20px">
        <Box display="flex" justifyContent="space-between">
          <Box display="flex" flex="1" gap="20px">
            <Box flex="2">
              <FullCalendar {...calendarOptions} />
            </Box>

            <Box flex="1">
              <EventsPanel events={events} />
            </Box>
          </Box>
        </Box>
      </Box>

      <Modal
        open={openAddModal}
        onClose={() => setOpenAddModal(false)}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper
          sx={{
            width: 400,
            p: 3,
            outline: "none",
          }}
        >
          <Typography variant="h6" mb={2}>
            Add New Event
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            label="Event Title"
            fullWidth
            value={newEvent.title || ""}
            onChange={(e) =>
              setNewEvent({ ...newEvent, title: e.target.value })
            }
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button onClick={() => setOpenAddModal(false)} sx={{ mr: 1 }}>
              Cancel
            </Button>
            <Button variant="contained" onClick={handleAddEvent}>
              Add Event
            </Button>
          </Box>
        </Paper>
      </Modal>
    </>
  );
};
