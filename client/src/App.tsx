import "./App.css";
import { Box } from "@mui/material";
import { KanbanPage } from "./pages/KanbanPage";
import { AIChatPage } from "./pages/documents/AIChatPage";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { CalendarPage } from "./pages/CalendarPage";
import { UsersPage } from "./pages/users/UsersPage";
import {
  createTheme,
  ThemeProvider,
  CssBaseline,
  GlobalStyles,
} from "@mui/material";
import { FilesPage } from "./pages/files/FilesPage";
import { EditContractPage } from "./pages/files/EditContractPage";
import { ReportPage } from "./pages/reports/ReportPage";
import { Landing } from "./pages/landing/Landing";

const theme = createTheme({
  typography: {
    fontFamily: "Space Grotesk, Inter, Arial, sans-serif",
    fontSize: 16,
  },
  palette: {
    text: {
      primary: "#050316",
    },
    background: {
      default: "#fbfbfe",
    },
    primary: {
      main: "#2f27ce",
    },
    secondary: {
      main: "#dddbff",
    },
  },
  components: {
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          color: "secondary",
        },
      },
    },
  },
});

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Landing />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/workload/kanban",
      element: <KanbanPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/workload/calendar",
      element: <CalendarPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/documents/files",
      element: <FilesPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/documents/files/:documentId",
      element: <EditContractPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/documents/chat",
      element: <AIChatPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/reports",
      element: <ReportPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
    {
      path: "/users",
      element: <UsersPage />,
      errorElement: (
        <Box>
          404: Ooppps are you sure you are on the right page? <h2>&#128517;</h2>
        </Box>
      ),
    },
  ]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          html: { fontSize: "100%" },
        }}
      />
      <RouterProvider router={router} />
    </ThemeProvider>
  );
}

export default App;
