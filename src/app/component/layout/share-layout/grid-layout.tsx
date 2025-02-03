import { Divider } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
  showLine?: boolean;
}

export default function GridLayout({ children, showLine }: GridLayoutProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }} // กำหนดการเว้นระยะห่างระหว่างไอเท็มใน Grid
      columns={{ xs: 4, sm: 6, md: 12 }} // กำหนดจำนวนคอลัมน์สำหรับแต่ละขนาดหน้าจอ
      sx={{
        flexGrow: 1, // ให้ Grid ขยายเต็มที่
        justifyContent: "center", // จัดให้เนื้อหากลางแนวนอน
        alignItems: "center", // จัดให้เนื้อหากลางแนวตั้ง
        height: "100%", // ใช้ความสูงเต็มที่
        textAlign: "center", // จัดข้อความใน Grid ให้เป็นแนวกลาง
      }}
    >
      {React.Children.map(children, (child, index) => (
        <>
          {showLine && index > 0 && (
            <Divider orientation="vertical" variant="middle" flexItem />
          )}{" "}
          {/* ถ้า showLine เป็น true จะแสดง <hr> */}
          <Grid key={index}>{child}</Grid> {/* แสดง children */}
        </>
      ))}
    </Grid>
  );
}
