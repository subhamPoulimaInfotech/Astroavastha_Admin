import { Grid, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { COLORS } from '../../constants/colors'
import { Inter } from '../../constants/font'
import { Dailyusers, Downarrow, Totalsales } from '../../constants/icon'
import { Male } from '../../constants/Image'
import CircleProgressBar from './CircleProgressBar'

export default function UserMetrics() {

  const userMetricsData = [
    { label: 'Teenagers', unit: 'K', value: 55, maxValue: 20, color: '#42C595', size: 92},
    { label: '20 - 29 age', unit: 'L', value: 8.7, maxValue: 20, color: '#B7C07B', size: 92 },
    { label: '40 - 49 age', unit: 'L', value: 6.5, maxValue: 20, color: '#855079', size: 92 },
    { label: '50 - 59 age', unit: 'L', value: 5.6, maxValue: 20, color: '#4247C5', size: 92},
    { label: '60 - 69 age', unit: 'L', value: 4.8, maxValue: 20, color: '#8130D2', size: 92 },
    { label: 'Above 70 age', unit: 'K', value: 10, maxValue: 20, color: '#FF65DC', size: 92 },
  ];

  return (
    <div>
      <Box sx={{ display: 'flex', flexDirection: 'column', m: '1.6rem 1rem', p: '0.5rem 0.6rem', borderRadius: '10px', backgroundColor: '#E0E5EF'}}>
      <Typography fontSize={24} fontWeight={"700"} pb={'1rem'}>
        User Metrics
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: '1rem', flexDirection: 'row'}}>
      <Grid>
        <Grid item sx={{ gap: '0.5rem', display: 'flex', flexDirection: 'column'}} >
          <Box sx={{ display: 'flex', gap: '0.5rem' }} >
            <Box
              bgcolor={COLORS.PrimaryWhite}
              borderRadius={1}
              sx={{ p: '2rem 3rem'}}
              textAlign={"center"}
            >
              <img
                src={Totalsales}
                alt={"Active Users"}
                style={{ width: "6rem" }}
              />
              <Typography fontSize={18} fontWeight={"500"}>
                Active Users
              </Typography>
              <Typography fontSize={15}>-3% active users</Typography>
              <Typography fontSize={21} fontWeight={"600"}>
                15.2 K
              </Typography>
            </Box>
            <Box
              bgcolor={COLORS.PrimaryWhite}
              borderRadius={1}
              sx={{ p: '2rem 3rem'}}
              textAlign={"center"}
            >
              <img
                src={Dailyusers}
                alt={"Registered users"}
                style={{ width: "6rem" }}
              />
              <Typography fontSize={18} fontWeight={"500"}>
                Total Users
              </Typography>
              <Typography fontSize={15}>+15% new users</Typography>
              <Typography fontSize={21} fontWeight={"600"}>
                35.32 L
              </Typography>
            </Box>
          </Box>
          <Box sx={{ backgroundColor: 'white', p: '1rem 0.9rem 1rem 0.9rem', borderRadius: '4px'}}>
            <Typography sx={{ fontWeight: '600', fontFamily: Inter, pb: '0.5rem' }}>User Retention Rates</Typography>
            <Box display={"flex"} justifyContent={"space-between"}>
              <Box sx={{ width:"50%", backgroundColor: "#ACDED4", borderRadius: '4px', p: '0.5rem', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '0.4rem'}}>
                <img src={Dailyusers} alt='rates' style={{ width: "2.5rem", height: '2.5rem' }} />
                <Typography fontSize={21} fontWeight={"600"}>35,32,543</Typography>
              </Box>
              <Box width={"50%"} pl={'1rem'}>
                <Typography sx={{ color: '#29AB91', fontFamily: 'Inter'}}>Retention Rate</Typography>
                <Box
                  display={"flex"}
                  alignItems={"center"}
                >
                  <img src={Downarrow} alt='down' style={{ width: "1.3rem", height: '1.3rem'}} />
                  <Typography>
                  <span style={{ fontWeight: 'bold', fontSize: '1.3rem'}}>90%</span> last week
                  </Typography>
                </Box>
              </Box>
            </Box>
            <Box sx={{ mt: '2rem', display: 'flex', justifyContent: 'space-between', gap: '2rem'}}>
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#807F81', fontFamily: Inter }}>Above 4 hrs</Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: Inter }}>18,30,457</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#807F81', fontFamily: Inter }}>Above 4 hrs</Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: Inter }}>18,30,457</Typography>
              </Box>
              <Box>
                <Typography sx={{ fontSize: '14px', color: '#807F81', fontFamily: Inter }}>Above 4 hrs</Typography>
                <Typography sx={{ fontSize: '20px', fontWeight: 'bold', fontFamily: Inter }}>18,30,457</Typography>
              </Box>
            </Box>
          </Box>
        </Grid>
        {/* <Grid item xs={7}></Grid> */}
      </Grid>
      <Grid sx={{ display: 'flex', gap: '0.5rem', flexDirection: 'column'}}>
        <Grid sx={{ backgroundColor: 'white', height: 'auto', p: '0.5rem 1rem', borderRadius: '4px'}}>
        <Typography sx={{ fontWeight: '600', fontFamily: Inter, pb: '0.5rem', fontSize: '1.2rem' }}>User Demographics</Typography>
        <Typography sx={{ fontWeight: 'normal', fontFamily: Inter, pb: '0.5rem' }}>User's gender</Typography>
          <Grid container sx={{ display: 'flex', gap: '1rem'}}>
            <Box container sx={{ backgroundColor: '#29AB91', display: 'flex', p: '0.8rem 1rem', borderRadius: '4px',   justifyContent: 'center', alignItems: 'center', gap: '1rem'}}>
            <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '1.4rem', fontFamily: Inter}}>25.98 L</Typography>
            <img src={Male} style={{ width: '2rem', height: '2rem'}} />
            </Box>
            <Box container sx={{ backgroundColor: '#FF008A', display: 'flex', p: '0.8rem 1rem', borderRadius: '4px',   alignItems: 'center', gap: '1rem'}}>
            <Typography sx={{ color: 'white', fontWeight: 'bold',  fontSize: '1.4rem', fontFamily: Inter}}>25.98 L</Typography>
            <img src={Male} style={{ width: '2rem', height: '2rem'}} />
            </Box>
            <Box container sx={{ backgroundColor: '#39A1EA', alignItems: 'center', display: 'flex', p: '0.8rem 1rem',   borderRadius: '4px', gap: '1rem'}}>
            <Typography sx={{ color: 'white', fontWeight: 'bold',  fontSize: '1.4rem', fontFamily: Inter}}>25.98 L</Typography>
            <img src={Male} style={{ width: '2rem', height: '2rem'}} />
          </Box>
          </Grid>
        </Grid>
        <Grid sx={{ backgroundColor: 'white', height: 'auto', p: '1rem 1rem', borderRadius: '4px'}}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between'}}>
          <Typography sx={{ fontWeight: '600', fontFamily: Inter, pb: '0.5rem', fontSize: '1.2rem' }}>User's Age</Typography>
          <Box>
            <p style={{ fontSize: '0.8rem'}}>Location: </p>
          </Box>
        </Box>
        <Typography sx={{ fontWeight: 'normal', fontFamily: Inter, pb: '0.5rem', fontSize: '0.9rem' }}>Users in India</Typography>
        <Grid sx={{ display: 'flex', mb: '1.1rem', justifyContent: 'space-between', gap: '5rem'}}>
        <Grid container sx={{ display: 'flex', width: '7rem', justifyContent: 'space-between', flexDirection: 'column', alignItems: 'center', gap: '1rem'}}>
          <Box sx={{ backgroundColor: '#ACDED4', width: '5rem', ml: '-1.5rem', fontWeight: '700', p: '0.5rem 1rem', fontFamily: Inter, borderRadius: '4px'}}>10,35,789</Box>
          <CircleProgressBar value={10.3} maxValue={20} strokeColor="#182E67" size={140} unit="L" />
          <Typography sx={{ color: '#807F81', fontFamily: Inter}}>30 - 40 age</Typography>
        </Grid>
        <Grid container spacing={2} mt={'-25px'}>
            {userMetricsData.map((data, index) => (
              <Grid item key={index} xs={3.8} style={{ textAlign: 'center' }}>
                <CircleProgressBar value={data.value} maxValue={data.maxValue} strokeColor={data.color} unit={data.unit} size={data.size} />
                <Typography sx={{ color: '#807F81', fontFamily: Inter }}>{data.label}</Typography>
              </Grid>
            ))}
        </Grid>
        </Grid>
        </Grid>
      </Grid>
      </Box>
      </Box>
    </div>
  )
}
