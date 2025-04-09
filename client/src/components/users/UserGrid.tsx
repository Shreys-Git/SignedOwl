import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import axios from "axios";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  {
    field: "user_id",
    headerName: "User ID",
    width: 150,
    editable: true,
  },
  {
    field: "first_name",
    headerName: "First name",
    width: 150,
    editable: true,
  },
  {
    field: "last_name",
    headerName: "Last name",
    width: 150,
    editable: true,
  },
  {
    field: "email",
    headerName: "Email",
    width: 110,
    editable: true,
  },
];

export const UserGrid = () => {
  const [rows, setRows] = useState([]);
  const [selectedRow, setSelectedRow] = useState<number | null>(null); // Store the selected row ID

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/v1/users");
        if (response.status === 200) {
          const rowsWithId = response.data.map((user: any) => ({
            ...user,
            id: user.user_id,
          }));
          setRows(rowsWithId);
        }
      } catch (error) {
        console.log("Could not fetch users");
      }
    };
    fetchUsers();
  }, []);

  const handleSelectionModelChange = (newSelection: any) => {
    // Only allow a single row to be selected at a time
    setSelectedRow(newSelection.length > 0 ? newSelection[0] : null);
  };

  return (
    <Box sx={{ height: 400, width: "100%" }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        onRowSelectionModelChange={handleSelectionModelChange}
        rowSelectionModel={selectedRow ? [selectedRow] : []} // Only allow one row to be selected
      />
      <div>
        <h3>Selected Row ID: {selectedRow}</h3>
      </div>
    </Box>
  );
};
