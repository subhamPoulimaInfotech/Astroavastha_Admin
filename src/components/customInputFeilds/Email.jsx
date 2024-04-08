import React from 'react';
import { TextField, Box, useTheme } from '@mui/material';
import { ErrorMessage, useField } from 'formik';
import { formError_textcolor } from '../../constants/colors';

export default function Email({ name, error, touched }) {
    const [field, meta] = useField(name);
    const theme = useTheme();
  return (
    <Box>
      <TextField
       {...field}
        label="Mobile Number"
        autoComplete='off'
        variant="outlined"
        fullWidth
        helperText={(meta.touched && meta.error) ? meta.error : ' '}
        error={meta.touched && !!meta.error}
        sx={{
            '& .MuiInputBase-input, & .MuiInputLabel-root, & label.Mui-focused': {
              color: 'white',
              fontFamily: "Lexend, sans-serif",
              fontSize: "18px"
            },

            '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
              '& legend': {
                width: '140',
              },
              '& legend span': {
                paddingRight: '22px', 
                display: 'inline-block'
              },
            },

            '& .MuiInputBase-input:-webkit-autofill': {
              WebkitTextFillColor: 'white !important',
              transition: 'background-color 5000s ease-in-out 0s', // Forces the background transition to be very slow
              WebkitBackgroundClip: 'text', // Clips the background to the text, effectively making it transparent
            },

            [theme.breakpoints.up('1500')]: {
              '& .MuiInputBase-input, & .MuiInputLabel-root, & label.Mui-focused': {
                fontSize: "1.3rem", // This fontSize will apply for screens wider than 1400px
              },
              '& .MuiFormHelperText-root.Mui-error': {
                fontSize: '1.25rem', // Adjust the font size as needed
              },
            },
            '& .MuiOutlinedInput-root': {
              '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
                borderColor: 'white',
              },
            },

            '& .MuiInputBase-input, & .MuiOutlinedInput-input': {
              '@media (max-width: 1024px)': {
                height: '15px',
              },
            },

            '& .MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: 'white',
            },
            '& .MuiOutlinedInput-root.Mui-error .MuiInputBase-input, & .MuiOutlinedInput-root.Mui-error .MuiInputLabel-root': {
              color: 'white',
            },
            '& input': {
              caretColor: 'white',
            },
            '& .MuiFormHelperText-root.Mui-error': {
              color: formError_textcolor,
              fontWeight: 'bold',
              fontFamily: "Lexend, sans-serif",
            },
            '& .MuiInputLabel-root.Mui-error': {
              color: 'white',
            },
        }}
      />
    </Box>
  );
}
