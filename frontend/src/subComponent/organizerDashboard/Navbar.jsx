import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, Divider, ListItem, ListItemButton, ListItemText, List, Menu, MenuItem } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import '../../assets/css/navbar.scss';
import { NavLink, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

function Navbar(props) {
const { window } = props;
const navigate = useNavigate();
const localStorageItems = JSON.parse(localStorage.getItem('userLoginTrack'));
const cookieVal = Cookies.get('ACCESS_TOKEN');
useEffect(() => {
  if(!cookieVal){
    localStorage.setItem('userLoginTrack', JSON.stringify({
      __isLoggedIn: false,
      email: '',
      name: '',
      neech: ''
    }));
  }
  if(!localStorageItems.__isLoggedIn){
    navigate('/sign-in');
  }
  // eslint-disable-next-line
}, [])

const drawerWidth = 240;
const [mobileOpen, setMobileOpen] = useState(false);
let navItems;
if(localStorageItems.neech === 'Arena Owner'){
  navItems = ['Dashboard', 'Add Your Arena'];
}
else if(localStorageItems.neech === 'Organizer'){
  navItems = ['Dashboard', 'Add a new competition'];
}
else if(localStorageItems.neech === 'Participant'){
  navItems = ['Dashboard', 'Apply in Competitions'];
}
else{
  navItems = ['', ''];
}
const container = window !== undefined ? () => window().document.body : undefined;
const handleDrawerToggle = () => {
  setMobileOpen((prevState) => !prevState);
};
const [anchorEl, setAnchorEl] = React.useState(null);
const open = Boolean(anchorEl);
const handleClick = (event) => {
  setMobileOpen((prevState) => !prevState);
  setAnchorEl(event.currentTarget);
};
const handleClose = () => {
  setMobileOpen((prevState) => !prevState);
  setAnchorEl(null);
};
const handleLogout = () => {
  localStorage.setItem('userLoginTrack', JSON.stringify({
    __isLoggedIn: false,
    email: '',
    name: '',
    neech: ''
  }));
  Cookies.remove('ACCESS_TOKEN');
  navigate('/sign-in');
}

const drawer = (
<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }} className="mobileDrawer">
    <Typography variant="h6" sx={{ my: 2 }}>
      <img src={process.env.PUBLIC_URL + '/assets/images/navbar/Logo.png'} alt="LOGO" className="logo"  />
    </Typography>
    <Divider />
    <List>
    {navItems.map((item) => (
        <ListItem key={item} disablePadding>
        <ListItemButton sx={{ textAlign: 'center' }}>
            <ListItemText primary={item} />
        </ListItemButton>
        </ListItem>
    ))}
        <ListItem disablePadding>
          <ListItemButton sx={{ textAlign: 'center' }}>
              <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
                className="dropDownButton"
              >
                {localStorageItems.name}
              </Button>
          </ListItemButton>
        </ListItem>
    </List>
</Box>
);
  return (
    <div>
        <AppBar component="nav">
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography
                    variant="h6"
                    component="div"
                    sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
                >
                    <img src={process.env.PUBLIC_URL + '/assets/images/navbar/Logo.png'} alt="logo" className="logo" />
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                    ))}
                    <Button
                      id="basic-button"
                      aria-controls={open ? 'basic-menu' : undefined}
                      aria-haspopup="true"
                      aria-expanded={open ? 'true' : undefined}
                      onClick={handleClick}
                      className="dropDownButton"
                    >
                      {localStorageItems.name}
                    </Button>
                </Box>
            </Toolbar>
      </AppBar>
      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        <MenuItem onClick={handleClose}>
          <NavLink className="text-white text-decoration-none" to='/dashboard/owner/profile'>Profile</NavLink>
        </MenuItem>
        <MenuItem onClick={handleClose}>
          <NavLink className="text-white text-decoration-none" to='/dashboard/owner/balance'>My Balance</NavLink>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          Logout
        </MenuItem>
      </Menu>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </div>
  )
}

export default Navbar