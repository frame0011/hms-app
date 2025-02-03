import { Card, CardContent, Stack, Typography } from "@mui/material";
import React from "react";
interface PageLayoutProps {
  children: React.ReactNode;
  title: string;
}

function PageLayout({ children, title }: PageLayoutProps) {
  return (
    <Stack spacing={2} margin={2}>
      <Typography sx={{ fontWeight: "bold", textAlign: "left" }}>
        {title}
      </Typography>
      <Card>
        <CardContent>{children}</CardContent>
      </Card>
    </Stack>
  );
}
export default PageLayout;
