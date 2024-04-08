import { Box, Typography } from '@mui/material'
import React from 'react'
import { Inter } from '../../constants/font'
import { LoadThemes } from '../../constants/Image'

export default function TechnicalMetrics() {

    const metrics = [
        { backgroundColor: '#9BD0F7', imageSrc: LoadThemes, title: 'Load Items', time: '0.23 s' },
        // Add more metric items here as needed
      ];
      
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', m: '1.6rem 1rem', p: '0.5rem 0.6rem', borderRadius: '10px', backgroundColor: '#E0E5EF' }}>
      <Typography fontSize={24} fontWeight={"700"} pb={'1rem'}>Technical Metrics</Typography>
      <Box sx={{ backgroundColor: 'white', borderRadius: '4px', margin: '0.3rem', padding: '0.5rem 0.2rem 1rem 0.5rem'}}>
        <Typography sx={{ fontWeight: '600', fontFamily: Inter, fontSize: '1rem'}}>App Performance</Typography>
        <Box sx={{ padding: '0.8rem 0.2rem', display: 'flex', gap: '1rem'}}>
            <Box sx={{ backgroundColor: '#9BD0F7', width: '9rem', borderRadius: '4px', height: 'auto', display: 'flex', gap: '1rem', flexDirection: 'column', padding: '0.9rem 1rem'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <img src={LoadThemes} style={{ width: '2.5rem', height: '2.5rem'}} />
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white'}}>Load Items</Typography>
                </Box>
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white', fontSize: '1.5rem'}} >0.23 s</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#9BD0F7', width: '9rem', borderRadius: '4px', height: 'auto', display: 'flex', gap: '1rem', flexDirection: 'column', padding: '0.9rem 1rem'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <img src={LoadThemes} style={{ width: '2.5rem', height: '2.5rem'}} />
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white'}}>Load Items</Typography>
                </Box>
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white', fontSize: '1.5rem'}} >0.23 s</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#9BD0F7', width: '9rem', borderRadius: '4px', height: 'auto', display: 'flex', gap: '1rem', flexDirection: 'column', padding: '0.9rem 1rem'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <img src={LoadThemes} style={{ width: '2.5rem', height: '2.5rem'}} />
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white'}}>Load Items</Typography>
                </Box>
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white', fontSize: '1.5rem'}} >0.23 s</Typography>
            </Box>
            <Box sx={{ backgroundColor: '#9BD0F7', width: '9rem', borderRadius: '4px', height: 'auto', display: 'flex', gap: '1rem', flexDirection: 'column', padding: '0.9rem 1rem'}}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                <img src={LoadThemes} style={{ width: '2.5rem', height: '2.5rem'}} />
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white'}}>Load Items</Typography>
                </Box>
                <Typography sx={{ fontWeight: 'bold', fontFamily: Inter, color: 'white', fontSize: '1.5rem'}} >0.23 s</Typography>
            </Box>
        </Box>
      </Box>
    </Box>
  )
}
