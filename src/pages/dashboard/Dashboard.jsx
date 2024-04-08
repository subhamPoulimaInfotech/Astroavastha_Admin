import { Box, Grid, Input, Select, TextField, Typography } from "@mui/material";
import React from "react";
import { Logout, Male } from "../../constants/Image";
import AstroLineChart from "../../components/LineChart";
import { COLORS } from "../../constants/colors";
import {
  Dailysales,
  Dailyusers,
  Downarrow,
  Reports,
  Totalsales,
  Uparrow,
} from "../../constants/icon";
import Header from "../../components/Header";
import { Inter } from "../../constants/font";
import UserMetrics from "./UserMetrics";
import TechnicalMetrics from "./TechnicalMetrics";

const boxesData = [
  {
    imageSrc: Totalsales,
    title: "Total Sales",
    subTitle: "+35 incomes",
    value: "₹ 21.72 L",
  },
  {
    imageSrc: Dailysales,
    title: "Daily Sales",
    subTitle: "+35 incomes",
    value: "₹ 15.2 K",
  },
  {
    imageSrc: Dailyusers,
    title: "Daily Users",
    subTitle: "+35 incomes",
    value: "1250",
  },
  {
    imageSrc: Reports,
    title: "Reports",
    subTitle: "+35 incomes",
    value: "523",
  },
];

const Dashboard = () => {
  return (
    <Box bgcolor={"#E9EFFB"} sx={{ fontFamily: Inter}}>
      <Header />
      <Grid container sx={{ display: 'flex', justifyContent: 'space-between', pl: '1.6rem', pr: '1.6rem'}}>
        <Grid item sx={{ display: 'flex', gap: '0.5rem'}}>
          {boxesData.map((box, index) => (
            <Box
              key={index}
              bgcolor={COLORS.PrimaryWhite}
              borderRadius={1}
              p={4}
              textAlign={"center"}
            >
              <img
                src={box.imageSrc}
                alt={box.title}
                style={{ width: "4.5rem" }}
              />
              <Typography fontSize={18} fontWeight={"500"}>
                {box.title}
              </Typography>
              <Typography fontSize={15}>{box.subTitle}</Typography>
              <Typography fontSize={21} sx={{ pt: '1rem'}} fontWeight={"600"}>
                {box.value}
              </Typography>
            </Box>
          ))}
        </Grid>
        <Grid
          sx={{ background: 'linear-gradient(to bottom, #f88400, #FFA640)' }}
          borderRadius={2}
          p={2}
          item
          xs={3.5}
          // height={200}
          // m={2}
        >
          <Box>
            <Typography
              color={COLORS?.PrimaryWhite}
              fontWeight={"600"}
              fontSize={28}
            >
              ₹ 18,58,687
            </Typography>
            <Typography color={COLORS?.PrimaryWhite}>Active Balance</Typography>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} mt={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <img
                src={Uparrow}
                alt='income'
                style={{ width: "1.5rem", marginRight: "5px" }}
              />
              <Typography color={COLORS?.PrimaryWhite}>Income</Typography>
            </Box>
            <Box>
              <Typography color={COLORS?.PrimaryWhite}>₹14.32K</Typography>
            </Box>
          </Box>
          <Box display={"flex"} justifyContent={"space-between"} mt={2}>
            <Box display={"flex"} justifyContent={"space-between"}>
              <img
                src={Downarrow}
                alt='tax'
                style={{ width: "1.5rem", marginRight: "5px" }}
              />
              <Typography color={COLORS?.PrimaryWhite}>Taxes</Typography>
            </Box>
            <Box>
              <Typography color={COLORS?.PrimaryWhite}>₹3205</Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <UserMetrics />
      <TechnicalMetrics />
      <AstroLineChart />
    </Box>
  );
};

export default Dashboard;
