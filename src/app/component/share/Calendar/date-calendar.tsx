import * as React from "react";
import dayjs from "dayjs";
import Textarea from "@mui/joy/Textarea";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import StartContentLayout from "../../layout/share-layout/start-content.tsx";
import { Box, Button, TextField, Stack } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import SaveAsIcon from "@mui/icons-material/SaveAs";
import { CheckInCheckOut } from "../../../model/cheeck-In-check-out-model.tsx";
import { useState, useEffect } from "react";
import StackLayout from "../../layout/share-layout/stack-layout.tsx";

interface DateCalendarFormProps {
  handleSubmit: (data: CheckInCheckOut[]) => void;
  dataCurrent?: CheckInCheckOut[];
}

export default function DateCalendarForm({
  handleSubmit,
  dataCurrent,
}: DateCalendarFormProps) {
  const [data, setData] = useState<CheckInCheckOut[]>([]);
  const [startDate, setStartDate] = useState<dayjs.Dayjs | null>(dayjs());
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");
  const [reason, setReason] = useState("");
  const [project, setProject] = useState("");
  const [workingHours, setWorkingHours] = useState(0);

  // ฟังก์ชันในการคำนวณชั่วโมงการทำงานระหว่างเวลาที่เริ่มต้นและเวลาที่เสร็จสิ้น
  const calculateWorkingHours = (startTime: string, endTime: string) => {
    const start = dayjs(startTime, "HH:mm");
    const end = dayjs(endTime, "HH:mm");
    return end.diff(start, "hour");
  };

  useEffect(() => {
    if (dataCurrent) {
      setData(dataCurrent);
    }
  }, [dataCurrent]);

  // ฟังก์ชันสำหรับบันทึกข้อมูล
  const handleSave = () => {
    if (startTime && endTime && project && reason) {
      const newData = new CheckInCheckOut(
        data.length + 1, // สร้าง id ใหม่
        "Sorawit", // เพิ่มข้อมูลชื่อผู้ใช้ตามที่ต้องการ
        startDate?.toDate() || new Date(),
        startTime,
        endTime,
        false, // ใส่ค่า default หรือเงื่อนไขของ holiday
        false, // ใส่ค่า default หรือเงื่อนไขของ leave
        project,
        8,
        reason
      );
      setData((prevData) => [...prevData, newData]);
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน!");
    }
  };

  const handleLeave = () => {
    const newData = new CheckInCheckOut(
      data.length + 1, // สร้าง id ใหม่
      "Sorawit", // เพิ่มข้อมูลชื่อผู้ใช้ตามที่ต้องการ
      startDate?.toDate() || new Date(),
      "",
      "",
      false, // ใส่ค่า default หรือเงื่อนไขของ holiday
      false, // ใส่ค่า default หรือเงื่อนไขของ leave
      "",
      0,
      reason
    );
    setData((prevData) => [...prevData, newData]);
  };
  const handleDelete = () => {
    if (data.length === 1) {
      setData([]);
    } else if (data.length > 1) {
      setData((prevData) => prevData.slice(0, prevData.length - 1));
    }
  };
  // ใช้ useEffect เพื่อเรียก handleSubmit เมื่อ data มีการเปลี่ยนแปลง
  useEffect(() => {
    if (data.length > 0) {
      handleSubmit(data); // ส่งข้อมูลล่าสุดให้ handleSubmit
    }
  }, [data, handleSubmit]); // useEffect นี้จะทำงานเมื่อ data มีการเปลี่ยนแปลง

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <StartContentLayout>
        <Box
          sx={{
            backgroundColor: "orange",
            width: "100%",
            borderRadius: "5px",
            color: "#5d2e2e",
            padding: "5px",
            textAlign: "center",
          }}
        >
          {new Date(Date.now()).toLocaleString("en-GB")}
        </Box>
      </StartContentLayout>

      <DemoContainer components={["DateCalendar", "DateCalendar"]}>
        <DemoItem>
          {/* วันที่เลือกจากปฏิทิน */}
          <DateCalendar
            defaultValue={startDate}
            onChange={(newDate) => setStartDate(newDate)}
          />
        </DemoItem>
      </DemoContainer>

      <StackLayout direction="column">
        <StackLayout direction="row">
          <TextField
            size="small"
            label="Project"
            value={project}
            onChange={(e) => setProject(e.target.value)}
            sx={{ marginTop: "10px" }}
          />

          <TextField
            size="small"
            label="Start Time"
            name="Start Time"
            defaultValue="8:30"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
          />
          <TextField
            size="small"
            label="End Time"
            name="End Time"
            defaultValue="17:30"
            value={endTime}
            onChange={(e) => {
              setEndTime(e.target.value);
              setWorkingHours(calculateWorkingHours(startTime, e.target.value));
            }}
          />
        </StackLayout>

        <StackLayout direction="row">
          <Textarea
            minRows={2}
            placeholder="Leave Reason (Optional)"
            sx={{ marginTop: "10px", width: "100%" }}
            value={reason}
            onChange={(e) => setReason(e.target.value)}
          />
        </StackLayout>
      </StackLayout>

      <Stack spacing={2} direction="row" sx={{ marginTop: "10px" }}>
        <Button
          variant="contained"
          color="inherit"
          size="small"
          onClick={handleLeave}
        >
          Leave <LogoutIcon sx={{ width: "13px", height: "13px" }} />
        </Button>
        <Button
          variant="contained"
          size="small"
          onClick={handleSave} // บันทึกข้อมูลเมื่อคลิกปุ่ม Save
        >
          Save <SaveAsIcon sx={{ width: "13px", height: "13px" }} />
        </Button>
        <Button
          variant="contained"
          size="small"
          color="error"
          onClick={handleDelete} // บันทึกข้อมูลเมื่อคลิกปุ่ม Save
        >
          Delete Last Items{" "}
          <SaveAsIcon sx={{ width: "13px", height: "13px" }} />
        </Button>
      </Stack>
    </LocalizationProvider>
  );
}
