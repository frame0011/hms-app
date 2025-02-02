import Grid from "@mui/material/Grid2";
import React from "react";

interface GridLayoutProps {
  children: React.ReactNode;
}

export default function GridLayout({ children }: GridLayoutProps) {
  return (
    <Grid
      container
      spacing={{ xs: 2, md: 3 }}
      columns={{ xs: 4, sm: 8, md: 12 }}
      sx={{
        flexGrow: 1,
        justifyContent: "center", // ✅ จัดให้อยู่กลางแนวนอน
        alignItems: "center", // ✅ จัดให้อยู่กลางแนวตั้ง
        height: "100%", // ✅ ให้กินพื้นที่เต็มที่
        textAlign: "center",
      }}
    >
      {React.Children.map(children, (child, index) => (
        <Grid key={index}>{child}</Grid>
      ))}
    </Grid>
  );
}
