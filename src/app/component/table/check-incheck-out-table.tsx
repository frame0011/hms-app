import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CircularProgress,
  Button,
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
              <TableRow key={item.id}>
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
    </div>
  );
}

export default CheckInCheckOutTable;
