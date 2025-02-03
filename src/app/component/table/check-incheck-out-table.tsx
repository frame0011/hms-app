import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
  TableContainer,
  Paper,
} from "@mui/material";
import * as XLSX from "xlsx"; // Import XLSX for Excel export
import { CheckInCheckOut } from "../../model/cheeck-In-check-out-model.tsx";

interface CheckInCheckOutTableProps {
  userName: string;
  basePath: string;
  showData: CheckInCheckOut[];
}

function CheckInCheckOutTable({
  userName,
  basePath,
  showData,
}: CheckInCheckOutTableProps) {
  const [data, setData] = useState<CheckInCheckOut[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setData(showData);
    setLoading(false);
  }, [showData]);

  if (loading) {
    return <CircularProgress />;
  }

  if (error) {
    return <div>{error}</div>;
  }

  // Function to handle export to Excel
  const handleExportToExcel = () => {
    // Map data to an array of objects that will be exported
    const exportData = data.map((item) => ({
      ID: item.id,
      Date: item.date.toLocaleDateString("en-GB"), // ใช้ toLocaleDateString เพื่อให้แสดงแค่วันที่
      StartTime: item.startTime,
      EndTime: item.endTime,
      WorkingHours: item.workingHours === 0 ? "" : item.workingHours, // Replace 0 with blank
      Project: item.project,
      Reason: item.reason || "", // Add a fallback for Reason if it's undefined
    }));

    // Create a worksheet from the exportData
    const ws = XLSX.utils.json_to_sheet(exportData);

    // Add border style to each cell and background color if Reason is present
    const range = XLSX.utils.decode_range(ws["!ref"]?.toString() ?? "");

    // Loop through all cells in the range and set borders and background color
    for (let row = range.s.r; row <= range.e.r; row++) {
      for (let col = range.s.c; col <= range.e.c; col++) {
        const address = { r: row, c: col }; // Define the address of the cell
        const cellRef = XLSX.utils.encode_cell(address); // Get cell reference (e.g., "A1")
        const cell = ws[cellRef]; // Get the cell

        // Set border for the current cell
        if (cell) {
          // Check if 'Reason' exists in the current row (use row index to access item)
          const item = data[row - 1]; // Adjust for header row, so we access `data[row - 1]`

          // Set styles for the cell
          cell.s = {
            border: {
              top: { style: "thin", color: { rgb: "000000" } }, // top border
              left: { style: "thin", color: { rgb: "000000" } }, // left border
              bottom: { style: "thin", color: { rgb: "000000" } }, // bottom border
              right: { style: "thin", color: { rgb: "000000" } }, // right border
            },
            fill:
              item && item.reason
                ? { fgColor: { rgb: "BFBFBF" } } // Set background color to #BFBFBF if Reason exists
                : undefined,
          };
        }
      }
    }

    // Create a new workbook with the worksheet
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "CheckInCheckOut");

    // Export the workbook as an Excel file
    XLSX.writeFile(wb, "CheckInCheckOut_Data.xlsx");
  };

  return (
    <div>
      <Button variant="contained" color="primary" onClick={handleExportToExcel}>
        Export to Excel
      </Button>

      <TableContainer
        component={Paper}
        style={{ maxHeight: 400, overflow: "auto" }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>StartTime</TableCell>
              <TableCell>EndTime</TableCell>
              <TableCell>WorkingHours</TableCell>
              <TableCell>Project</TableCell>
              <TableCell>Reason</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data &&
              data.map((item) => (
                <TableRow
                  key={item.id}
                  style={{
                    backgroundColor: item.reason ? "#BFBFBF" : "transparent", // หากมีค่าใน reason จะตั้งสีเป็นเทา
                  }}
                >
                  <TableCell>{item.date.toLocaleString("en-GB")}</TableCell>
                  <TableCell>{item.startTime}</TableCell>
                  <TableCell>{item.endTime}</TableCell>
                  <TableCell>
                    {item.workingHours === 0 ? "" : item.workingHours}
                  </TableCell>
                  <TableCell>{item.project}</TableCell>
                  <TableCell>{item.reason || ""}</TableCell>
                </TableRow>
              ))}

            {data.length === 0 && (
              <TableRow>
                <TableCell colSpan={6}>No data available</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}

export default CheckInCheckOutTable;
