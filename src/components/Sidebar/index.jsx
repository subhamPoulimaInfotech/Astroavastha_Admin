import * as React from "react";
import PropTypes from "prop-types";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { COLORS } from "../../constants/colors";
import { ActiveDI, ActiveNMI, ActivePMI, ActiveRMI, ActiveUMI, Logo } from "../../constants/Image";
import { Link, useLocation } from 'react-router-dom';
import { DashboardIcon } from "../../constants/Image";
import { ReportManagementIcon } from "../../constants/Image";
import { UserManagementIcon } from "../../constants/Image";
import { NotificationManagementIcon } from "../../constants/Image";
import { ProductManagementIcon } from "../../constants/Image";
import { AdminProfile } from "../../constants/Image";
import { PolyIcon } from "../../constants/Image";
import { Inter, Lexend } from "../../constants/font";

const drawerWidth = 280;

const iconMapping = (text, isActive) => {
  const icons = {
    "Dashboard": isActive ? <img style={{ width: "1.7rem", height: 'auto'}} src={ActiveDI} alt="Dashboard Icon" /> : <img style={{ width: "1.7rem", height: 'auto'}} src={DashboardIcon} alt="Dashboard Icon" />,
    "User Management": isActive ? <img style={{ width: "1.7rem", height: 'auto'}} src={ActiveUMI} alt="Dashboard Icon" /> : <img style={{ width: "1.7rem", height: 'auto'}} src={UserManagementIcon} alt="Dashboard Icon" />,
    "Report Management": isActive ? <img style={{ width: "1.7rem", height: 'auto'}} src={ActiveRMI} alt="Dashboard Icon" /> : <img style={{ width: "1.7rem", height: 'auto'}} src={ReportManagementIcon} alt="Dashboard Icon" />,
    "Notification Management": isActive ? <img style={{ width: "1.7rem", height: 'auto'}} src={ActiveNMI} alt="Dashboard Icon" /> : <img style={{ width: "1.7rem", height: 'auto'}} src={NotificationManagementIcon} alt="Dashboard Icon" />,
    "Product Management": isActive ? <img style={{ width: "1.7rem", height: 'auto'}} src={ActivePMI} alt="Dashboard Icon" /> : <img style={{ width: "1.7rem", height: 'auto'}} src={ProductManagementIcon} alt="Dashboard Icon" />,
  };
  
  return icons[text];
};

function ResponsiveDrawer(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [isClosing, setIsClosing] = React.useState(false);

  const location = useLocation();

  const isActive = (path) => location.pathname === path

  const handleDrawerClose = () => {
    setIsClosing(true);
    setMobileOpen(false);
  };

  const handleDrawerTransitionEnd = () => {
    setIsClosing(false);
  };

  const handleDrawerToggle = () => {
    if (!isClosing) {
      setMobileOpen(!mobileOpen);
    }
  };

  const drawer = (
    <div style={{ backgroundColor: COLORS?.PrimaryBlue, height: "100%", display: "flex", alignItems: 'center', flexDirection: 'column', justifyContent: 'space-between', padding: '1rem 0 2rem 0'}}>
      <div>
      <div style={{ marginLeft: "1rem"}}><img src={Logo} alt='logo' style={{ width: "10rem" }} /></div>
      <Divider />
      <List>
        {[
          { text: "Dashboard", path: "/" },
          { text: "User Management", path: "/user-management" },
          { text: "Report Management", path: "/report-management" },
          { text: "Notification Management", path: "/notification-management" },
          { text: "Product Management", path: "/product-management" },
        ].map((item, index) => (
          <ListItem key={index} disablePadding>
            <ListItemButton 
              sx={{
                backgroundColor: isActive(item.path) ? '#5B6AA1' : 'transparent',
                color: isActive(item.path) ? 'white' : '#D7DAE6',
                position: 'relative',
                '&::before': isActive(item.path) ? {
                  content: '""',
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '5px',
                  backgroundColor: 'white',
                } : {},
                '.MuiListItemIcon-root': {
                  color: isActive(item.path) ? 'white' : '#D7DAE6',
                },
                '&:hover': {
                    backgroundColor: '#5B6AA1',
                    '.MuiListItemIcon-root': {
                    },
                  },
                // ... your other styles
              }}
              component={Link} to={item.path}> {/* Use Link component */}
              <ListItemIcon>
                {iconMapping(item.text, isActive(item.path))}
              </ListItemIcon>
              <ListItemText
                style={{ fontFamily: Inter }}
                primary={item.text}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      </div>
      <Box sx={{
        backgroundColor: "#EA7D01",
        width: '90%',
        margin: "0 auto",
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1rem',
        boxSizing: 'border-box',
        height: 'auto',
        borderRadius: '5px'
      }}>
        <img src={AdminProfile} style={{ width: "2rem", height: "2rem"}} />
        <div>
          <p style={{ color: 'white', fontWeight: 'bold', fontFamily: Inter, fontSize: "1.1rem" }}>Santhosh Kumar</p>
          <p style={{ color: 'white', fontFamily: Inter, fontSize: "0.9rem" }}>Admin Manager</p>
        </div>
        <img src={PolyIcon} style={{ width: '0.5rem', height: '1rem'}} />
      </Box>
    </div>
  );

  // Remove this const when copying and pasting into your project.
  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box
      component='nav'
      sx={{
        width: { sm: drawerWidth },
        flexShrink: { sm: 0 },
        backgroundColor: COLORS.PrimaryBlue,
      }}
      aria-label='mailbox folders'
      
    >
      <Drawer
        container={container}
        variant='temporary'
        open={mobileOpen}
        onTransitionEnd={handleDrawerTransitionEnd}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true,
        }}
        sx={{
          backgroundColor: COLORS.PrimaryBlue,
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
      >
        {drawer}
      </Drawer>
      <Drawer
        variant='permanent'
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: drawerWidth,
          },
        }}
        open
      >
        {drawer}
      </Drawer>
    </Box>
  );
}

ResponsiveDrawer.propTypes = {
  /**
   * Injected by the documentation to work in an iframe.
   * Remove this when copying and pasting into your project.
   */
  window: PropTypes.func,
};

export default ResponsiveDrawer;
