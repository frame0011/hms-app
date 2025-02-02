import {
  Avatar,
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
} from "@mui/material";
import { deepOrange } from "@mui/material/colors";
import React from "react";
import GridLayout from "./share-layout/grid-layout.tsx";
import { light } from "@mui/material/styles/createPalette";

interface LoginLayoutProps {
  children: React.ReactNode;
  title?: string;
  subtitle?: string;
}

function LoginLayout({ children, title, subtitle }: LoginLayoutProps) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column", // ✅ จัดให้อยู่กึ่งกลางทั้งแนวตั้งและแนวนอน
        minHeight: "90vh",
        backgroundColor: "#f5f5f5",
      }}
    >
      <Card sx={{ minWidth: 320, padding: 3, textAlign: "center" }}>
        <GridLayout>
          <Avatar
            sx={{
              bgcolor: "lightgray",
              width: 56,
              height: 56,
              margin: "0 auto",
            }}
            alt="User Avatar"
            src="/broken-image.jpg"
          >
            A
          </Avatar>
          {title && (
            <Typography sx={{ fontWeight: "bold" }}>{title}</Typography>
          )}
        </GridLayout>
        {subtitle && (
          <Stack sx={{ mb: 1, fontWeight: "bold", color: "gray" }}>
            {subtitle}
          </Stack>
        )}
        <CardContent>{children}</CardContent>
      </Card>
    </Box>
  );
}

export default LoginLayout;
