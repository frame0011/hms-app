import React, { useState } from "react";
import PageLayout from "../../component/layout/share-layout/page-layout.tsx";
import CheckInCheckOutTable from "../../component/table/check-incheck-out-table.tsx";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { Box, Button, Grid, Stack } from "@mui/material";
import StartContentLayout from "../../component/layout/share-layout/start-content.tsx";
import GridLayout from "../../component/layout/share-layout/grid-layout.tsx";
import DateCalendarForm from "../../component/share/Calendar/date-calendar.tsx";
import { CheckInCheckOut } from "../../model/cheeck-In-check-out-model.tsx";
interface CheckInCheckOutPageProps {
  userName: string; // ข้อมูลผู้ใช้ที่ล็อกอิน
  basePath: string; // Path หรือ base URL ที่ส่งเข้ามา
}
function CheckInCheckOutPage({ userName, basePath }: CheckInCheckOutPageProps) {
  const [data, setData] = useState<CheckInCheckOut[]>([]);
  return (
    <>
      <PageLayout title={"Time Sheet"}>
        <GridLayout showLine={true}>
          <>
            <DateCalendarForm
              handleSubmit={function (data: CheckInCheckOut[]): void {
                console.log(data);
                setData(data);
              }}
            />
          </>
          <CheckInCheckOutTable
            userName={userName}
            basePath={basePath}
            showData={data}
          />
        </GridLayout>
      </PageLayout>
    </>
  );
}
export default CheckInCheckOutPage;
