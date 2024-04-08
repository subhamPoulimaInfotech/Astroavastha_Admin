import * as React from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box } from "@mui/material";
import { COLORS } from "../../constants/colors";

const janRevenue = 4000;
const febRevenue = 3000;
const marRevenue = 2000;
const aprRevenue = 2780;
const mayRevenue = 1890;
const junRevenue = 2390;
const julRevenue = 3490;
const augRevenue = 4200;
const sepRevenue = 3200;
const octRevenue = 2500;
const novRevenue = 2000;
const decRevenue = 3100;

const revenueData = [
  janRevenue,
  febRevenue,
  marRevenue,
  aprRevenue,
  mayRevenue,
  junRevenue,
  julRevenue,
  augRevenue,
  sepRevenue,
  octRevenue,
  novRevenue,
  decRevenue,
];

// Array containing the month labels
const monthLabels = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "June",
  "July",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function AstroLineChart() {
  return (
    <Box bgcolor={COLORS?.PrimaryWhite} width={'66rem'}  >
      <LineChart
        width={800}
        height={500}
        series={[{ data: revenueData, label: "Revenue" }]}
        xAxis={[{ scaleType: "point", data: monthLabels }]}
      />
    </Box>
  );
}
