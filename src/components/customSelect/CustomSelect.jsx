import React from 'react';
import { Select, MenuItem, Tooltip } from "@mui/material";
import { Lexend } from '../../constants/font';

const CustomSelect = ({ value, onChange, options, placeholder, style }) => {
  return (
    <Select
      displayEmpty
      value={value}
      MenuProps={{
        PaperProps: {
          style: {
            maxHeight: 200,
            maxWidth: '8rem',
            overflowY: 'auto',
          },
        },
      }}
        sx={{
            width: "8rem", 
            height: '2rem', 
            border: 'none', 
            fontSize: '0.9rem',
            fontFamily: Lexend, 
            backgroundColor: '#CCD3D2', 
            color: '#5D5F5F',
            "& .MuiSelect-select": {
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
            },
            ...style 
        }}
      onChange={onChange}
      renderValue={value !== "" ? undefined : () => placeholder}
    >
      {options?.map((option, index) => (
        <MenuItem
            value={option.value}
            key={index}
            sx={{
            // maxWidth: "8rem",
            }}
        >
            <div
            style={{
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
                maxWidth: "100%",
            }}
            title={option.label}
            >
            {option.label}
            </div>
        </MenuItem>
        ))}
    </Select>
  );
};

export default CustomSelect;
