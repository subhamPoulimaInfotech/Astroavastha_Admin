import React, { useState } from 'react';
import { TextField, Box, IconButton, InputAdornment } from '@mui/material';
import { useField } from 'formik';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { formError_textcolor } from '../../constants/colors';

export default function Password({ name }) {
  const [showPassword, setShowPassword] = useState(false);
  const [field, meta] = useField(name);

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <Box>
      <TextField
        {...field}
        type={showPassword ? 'text' : 'password'}
        label='Password'
        variant="outlined"
        fullWidth
        error={meta.touched && !!meta.error}
        helperText={meta.touched && meta.error}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={togglePasswordVisibility}
                edge="end"
              >
                {showPassword ? <VisibilityOff sx={{ color: 'black'}} /> : <Visibility sx={{ color: 'black'}} />}
              </IconButton>
            </InputAdornment>
          ),
        }}
        sx={{
          '& .MuiInputBase-input, & .MuiInputLabel-root, & label.Mui-focused': {
            color: 'white',
            fontFamily: "Lexend, sans-serif",
            fontSize: '16px',
          },
          '& .MuiOutlinedInput-root': {
            '& fieldset, &:hover fieldset, &.Mui-focused fieldset': {
              borderColor: 'white',
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
