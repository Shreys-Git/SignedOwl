import * as React from "react";
import ListSubheader from "@mui/material/ListSubheader";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import DashboardIcon from "@mui/icons-material/Dashboard";
import ArticleIcon from "@mui/icons-material/Article";
import AssessmentIcon from "@mui/icons-material/Assessment";
import PersonIcon from "@mui/icons-material/Person";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MessageIcon from "@mui/icons-material/Message";
import { Link, useLocation } from "react-router-dom";
import { Branding } from "./Branding";
import { Divider, Typography } from "@mui/material";

export const SideBar = () => {
  // Get the current path from the router
  const location = useLocation();

  // Helper function to check if the current route matches
  const isActive = (path: string) => location.pathname === path;

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 250,
        height: "100vh",
        bgcolor: "background.paper",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
      subheader={
        <ListSubheader component="div" id="nested-list-subheader">
          <Branding />
        </ListSubheader>
      }
    >
      <Divider sx={{ width: "80%", padding: 2 }} />
      {/**       DASHBOARD          */}
      <Link to="/" style={{ textDecoration: "none", color: "#000000" }}>
        <ListItemButton selected={isActive("/")}>
          <ListItemIcon>
            <DashboardIcon color={isActive("/") ? "primary" : "secondary"} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      {/**       DOCUMENTS          */}

      <Typography pl={2} py={2} color="text.secondary">
        DOCUMENTS
      </Typography>

      <Link
        to="/documents/files"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <ListItemButton selected={isActive("/documents/files")}>
          <ListItemIcon>
            <ArticleIcon
              color={isActive("/documents/files") ? "primary" : "secondary"}
            />
          </ListItemIcon>
          <ListItemText primary="Files" />
        </ListItemButton>
      </Link>

      <Link
        to="/documents/chat"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <ListItemButton selected={isActive("/documents/chat")}>
          <ListItemIcon>
            <MessageIcon
              color={isActive("/documents/chat") ? "primary" : "secondary"}
            />
          </ListItemIcon>
          <ListItemText primary="AI Chat" />
        </ListItemButton>
      </Link>

      {/**       REPORTS          */}
      <Link to="/reports" style={{ textDecoration: "none", color: "#000000" }}>
        <ListItemButton selected={isActive("/reports")}>
          <ListItemIcon>
            <AssessmentIcon
              color={isActive("/reports") ? "primary" : "secondary"}
            />
          </ListItemIcon>
          <ListItemText primary="Report" />
        </ListItemButton>
      </Link>

      {/**       USERS          */}
      <Link to="/users" style={{ textDecoration: "none", color: "#000000" }}>
        <ListItemButton selected={isActive("/users")}>
          <ListItemIcon>
            <PersonIcon color={isActive("/users") ? "primary" : "secondary"} />
          </ListItemIcon>
          <ListItemText primary="Users" />
        </ListItemButton>
      </Link>

      {/**       WORKFLOW          */}
      <Typography pl={2} py={2} color="text.secondary">
        WORKFLOW
      </Typography>

      <Link
        to="/workload/kanban"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <ListItemButton selected={isActive("/workload/kanban")}>
          <ListItemIcon>
            <AssignmentIndIcon
              color={isActive("/workload/kanban") ? "primary" : "secondary"}
            />
          </ListItemIcon>
          <ListItemText primary="Kanban" />
        </ListItemButton>
      </Link>

      <Link
        to="/workload/calendar"
        style={{ textDecoration: "none", color: "#000000" }}
      >
        <ListItemButton selected={isActive("/workload/calendar")}>
          <ListItemIcon>
            <CalendarMonthIcon
              color={isActive("/workload/calendar") ? "primary" : "secondary"}
            />
          </ListItemIcon>
          <ListItemText primary="Calendar" />
        </ListItemButton>
      </Link>
    </List>
  );
};
