import React from 'react'
import { useGetAllDraftsQuery } from '../../redux/api/productApi'
import { useSelector } from 'react-redux';
import { Box } from '@mui/material';

const SavedDrafts = () => {
  const token = useSelector((state) => state.auth.token);
  const { data: drafts } = useGetAllDraftsQuery({ token });
  console.log("🚀 ~ SavedDrafts ~ drafts:", drafts)

  return (
    <Box ml={5} >
      {
        drafts && drafts.length > 0 && drafts.map((el, index) => {
          return (
            <Box bgcolor={'red'} m={3} p={2} >
              <text key={index}>{el.name ? el.name : 'name'}</text>
            </Box>
          );
        })
      }

    </Box>
  )
}

export default SavedDrafts