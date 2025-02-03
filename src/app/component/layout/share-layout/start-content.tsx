import { Box } from "@mui/material";
import React from "react";

interface StartContentProps {
  children: React.ReactNode;
}
function StartContentLayout({ children }: StartContentProps) {
  return <Box sx={{ fontWeight: "bold", textAlign: "left" }}>{children}</Box>;
}

export default StartContentLayout;
