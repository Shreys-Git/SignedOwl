import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { Typography } from "@mui/material";
import axios from "axios";
import { Stat } from "./Files";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import PeopleIcon from "@mui/icons-material/People";
import { FileHeader } from "./FileHeader";

interface Party {
  id: string;
  name_in_agreement: string;
}

interface Provisions {
  effective_date?: string;
  expiration_date?: string;
  execution_date?: string;
  term_length?: string;
  assignment_type?: string;
  assignment_termination_rights?: string;
  payment_terms_due_date?: string;
  can_charge_late_payment_fees?: boolean;
  renewal_type?: string;
  renewal_notice_period?: string;
  renewal_notice_date?: string;
  auto_renewal_term_length?: string;
  termination_period_for_convenience?: string;
}

interface NavExtractions {
  id: string;
  file_name: string;
  type: string;
  category: string;
  status: string;
  parties: Party[];
  provisions: Provisions;
  languages: string[];
  source_name: string;
  source_id: string;
  source_account_id: string;
  metadata: {
    created_at: string;
    modified_at: string;
  };
}

export interface Agreement {
  _id: string;
  document_id: string;
  document_text: string;
  obligations: any[];
  navigator_extractions: NavExtractions;
  signature_metadata: {
    envelope_id: string;
    signature_status: string;
  };
  clauses: any[];
  versions: string[];
}

enum SignStatus {
  REVIEW = "Review",
  SIGNING = "Signature",
  COMPLETED = "Completed",
}

const columns: GridColDef[] = [
  {
    field: "id",
    headerName: "ID",
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.value}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "signStatus",
    headerName: "Status",
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "fileName",
    headerName: "File Name",
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "type",
    headerName: "Type",
    minWidth: 100,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "category",
    headerName: "Category",
    minWidth: 10,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "parties",
    headerName: "Parties",
    minWidth: 300,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "effectiveDate",
    headerName: "Effective Date",
    minWidth: 150,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
  {
    field: "expirationDate",
    headerName: "Expiration Date",
    minWidth: 150,
    renderCell: (params) => (
      <Link
        to={`/documents/files/${params.row.id}`}
        style={{ textDecoration: "none", color: "inherit" }}
      >
        {params.value}
      </Link>
    ),
  },
];
type FileGridProps = {
  setFileStats: React.Dispatch<React.SetStateAction<Stat[]>>;
};
export default function NavFileGrid({ setFileStats }: FileGridProps) {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isDataLoading, setIsDataLoading] = useState<boolean>(false);
  const [rows, setRows] = useState<any[]>([]);
  const [files, setFiles] = useState<File[] | null>([]);
  const [openUploadModal, setOpenUploadModal] = useState(false);
  const [signatureStatus, setSignatureStatus] = useState("Under Review");
  const handleClose = () => setOpenUploadModal(false);

  const transformData = (data: Agreement[]): any[] => {
    return data.map((agreement) => ({
      id: agreement.navigator_extractions.id,
      signStatus: agreement.signature_metadata.signature_status,
      fileName: agreement.navigator_extractions.file_name,
      type: agreement.navigator_extractions.type,
      category: agreement.navigator_extractions.category,
      status: agreement.navigator_extractions.status,
      parties: agreement.navigator_extractions.parties
        .map((party) => party.name_in_agreement)
        .join(", "),
      provisions: agreement.navigator_extractions.provisions,
      effectiveDate: agreement.navigator_extractions.provisions.effective_date,
      expirationDate:
        agreement.navigator_extractions.provisions.expiration_date,
    }));
  };

  const collateStats = (data: Agreement[]): Stat[] => {
    // Aggregate and compute the statistics
    const fileCategories = new Set<string>();
    let totalFiles = data.length;
    let totalParties = 0;

    data.forEach((agreement) => {
      fileCategories.add(agreement.navigator_extractions.category);
      totalParties += agreement.navigator_extractions.parties.length;
    });

    return [
      {
        title: "File Categories",
        value: fileCategories.size.toString(), // Unique file types
        delta: 0, // No delta calculation (static stat for now)
        icon: <ContentCopyIcon />,
      },
      {
        title: "Total Files",
        value: totalFiles.toString(), // Total files processed
        delta: 0, // No delta calculation (can be added if you track previous stats)
        icon: <AttachFileIcon />,
      },
      {
        title: "Total Parties",
        value: totalParties.toString(), // Total parties involved
        delta: 0, // No delta calculation
        icon: <PeopleIcon />,
      },
    ];
  };

  const fetchNavGridData = async () => {
    setIsLoggedIn(true);
    setIsDataLoading(true);
    try {
      const response = await axios.get<Agreement[]>(
        "http://localhost:8000/v1/documents/files/ALL/LATEST"
      );

      if (response.status == 200) {
        setRows(transformData(response.data));
        setFileStats(collateStats(response.data));
      } else {
        setRows([]);
        setFileStats([]);
      }
    } catch (error) {
      alert(
        "You need to provide Esign and Nav permissions from the top right corner"
      );
    } finally {
      setIsDataLoading(false);
    }
  };
  const uploadFiles = async () => {
    const formData = new FormData();

    // Append additional files if any
    if (files) {
      files.forEach((file) => formData.append("docs", file));
    }

    try {
      const response = await axios.post(
        "http://localhost:8000/documents/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.status === 200) {
        console.log("Upload succeeded");
      } else {
        console.error("Unexpected response:", response);
      }
    } catch (error) {
      console.error("Error during POST request:", error);
    }
  };
  useEffect(() => {
    fetchNavGridData();
  }, []);

  return (
    <Box margin={2}>
      <FileHeader />
      <Box sx={{ maxWidth: "100%", maxHeight: "80%" }}>
        {isDataLoading ? (
          <Typography>Loading data...</Typography>
        ) : (
          <DataGrid
            rows={rows}
            columns={columns}
            initialState={{
              pagination: {
                paginationModel: {
                  pageSize: 8,
                },
              },
            }}
            pageSizeOptions={[8]}
            checkboxSelection
            disableRowSelectionOnClick
          />
        )}
      </Box>
    </Box>
  );
}
