import { AppBar, Box, IconButton, Toolbar, Typography, Button, Drawer, Divider, ListItem, ListItemButton, ListItemText, List } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu';

import React, { useState } from 'react'

function Navbar(props) {
const { window } = props;
const drawerWidth = 240;
const [mobileOpen, setMobileOpen] = useState(false);
const navItems = ['Home', 'About', 'Contact'];
const container = window !== undefined ? () => window().document.body : undefined;
const handleDrawerToggle = () => {
setMobileOpen((prevState) => !prevState);
};
const drawer = (
<Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
    <Typography variant="h6" sx={{ my: 2 }}>
    MUI
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
                    MUI
                </Typography>
                <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
                    {navItems.map((item) => (
                    <Button key={item} sx={{ color: '#fff' }}>
                        {item}
                    </Button>
                    ))}
                </Box>
            </Toolbar>
      </AppBar>
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