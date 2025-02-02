import { Stack } from "@mui/material";
import Grid from "@mui/material/Grid2";
import React from "react";

interface StackLayoutProps {
  children: React.ReactNode;
  spacing?: number;
  direction?: "row" | "column";
  sx?: React.CSSProperties;
}

export default function StackLayout({
  children,
  spacing,
  direction,
  sx,
}: StackLayoutProps) {
  return (
    <Stack spacing={2}>
      <Stack spacing={spacing ?? 1} direction={direction ?? "row"}>
        {children}
      </Stack>
    </Stack>
  );
}
