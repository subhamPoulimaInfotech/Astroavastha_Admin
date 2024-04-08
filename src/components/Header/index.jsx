import { Box, Grid, Input, Typography, Modal, Button } from "@mui/material";
import InputAdornment from "@mui/material/InputAdornment";
import SearchIcon from "@mui/icons-material/Search";
import React, { useState } from "react";
import { Logout } from "../../constants/Image";
import { COLORS } from "../../constants/colors";
import { logout } from "../../redux/slices/authSlice";
import { useDispatch } from "react-redux";
import { text } from "@fortawesome/fontawesome-svg-core";

const Header = ({ searchQuery, setSearchQuery }) => {
  const [open, setOpen] = useState(false);

  const dispatch = useDispatch();

  const handleLogoutClick = () => {
    setOpen(true);
  };

  const handleConfirmLogout = () => {
    dispatch(logout());
    setOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Grid container sx={{ display: 'flex', padding: '1.5rem', justifyContent: 'space-between', width: '100%', gap: '1rem', flexWrap: 'nowrap', flexDirection: 'row' }}>
        <Grid item xs={8}>
          <Input
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder='Search'
            endAdornment={
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            }
            sx={{
              padding: "5px 10px",
              borderRadius: "10px",
              border: 'none',
              minWidth: '5rem',
              maxWidth: "30rem",
              width: '100%',
              bgcolor: COLORS.PrimaryWhite,
              "&:before": {
                borderBottom: 'none',
              },
              "&:after": {
                borderBottom: 'none',
              },
              "&:hover:not(.Mui-disabled):before": {
                borderBottom: 'none',
              },
            }}
          />
        </Grid>
        <Grid>
          <div style={{ cursor: 'pointer' }} onClick={handleLogoutClick} >
            <Box
              display={"flex"}
              width={"5.5rem"}
              bgcolor={"white"}
              justifyContent={"space-between"}
              alignItems={"center"}
              sx={{ p: '0.563rem 1rem' }}
              borderRadius={1.5}
            >
              <img src={Logout} alt='Logout' style={{ width: "1.5rem" }} />
              <Typography>Logout</Typography>
            </Box>
          </div>
        </Grid>
      </Grid>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: 410,
            height: 250,
            bgcolor: 'background.paper',
            borderRadius: '5px',
            p: 3,
          }}
        >
          <Box
            sx={{
              width: 340,
              height: 180,
              bgcolor: 'background.paper',
              boxShadow: '0.5px 0.5px 9px 2px #b7c7ff',
              borderRadius: '5px',
              p: 4,
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              gap: 4
            }}
          >
            <Typography id="modal-modal-title" variant="h6" component="h2" sx={{ textAlign: 'center' }}>
              Are you sure you want to logout?
            </Typography>
            <div style={{ display: "flex", justifyContent: 'center', gap: '2rem' }}>
              <Button onClick={handleConfirmLogout} sx={{ backgroundColor: "#FFFFFF", '&:hover': { color: '#374884', fontWeight: 'bold', backgroundColor: 'white' }, boxShadow: '0.5px 0.5px 5px 1px #dadada', width: "35%", color: '#374884', textTransform: "capitalize" }} >
                Yes I'm sure
              </Button>
              <Button sx={{ backgroundColor: "#374884", color: 'white', width: "35%", '&:hover': { backgroundColor: "#3f5191", fontWeight: 'bold' }, textTransform: "capitalize" }} onClick={handleClose}>Oops No</Button>
            </div>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};

export default Header;
