import './Navbar.scss';
import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from '@mui/material/FormGroup';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import { bindActionCreators } from 'redux';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../state/reducers';
import { useEffect, useState } from 'react';
import { Button } from '@mui/material';
import { actionCreators } from '../../state/';

export default function Navbar() {
  const auth = useSelector((state: RootState) => state).auth
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const dispatch = useDispatch();

  const { login, logout } = bindActionCreators(actionCreators, dispatch)
  const { show, hide } = bindActionCreators(actionCreators, dispatch)

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    
  };

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

 


  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{ background: '#2E3B55' }} position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Search
          </Typography>
         
            <div className='rightNavbarBlock'>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                  {auth.isGuest ? 'Guest' : <label>{auth.name}</label>}
                  {auth.id == '' && !auth.isGuest ? 
                   <Button
                   key='{page}'
                   onClick={show}
                   sx={{ mt: 0.5, color: 'white', display: 'block' }}
                 >
                   Register
                 </Button>
                   : <div></div>}
              </Typography>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'center',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top', 
                  horizontal: 'center'
                }}
                open={Boolean(anchorEl)}
                onClose={handleClose}
              >
                {auth.id != '' || auth.isGuest
                ?  
                  <div>
                    <MenuItem onClick={handleClose}>My Cards</MenuItem>
                    <MenuItem onClick={handleClose}>My Games</MenuItem> 
                  </div>
                : 
                <div></div>} 
                {auth.id == ''
                ?  
                    <div>
                     <MenuItem onClick={handleClose}>Sigh Up</MenuItem>
                     <MenuItem onClick={() =>{show(); handleClose()}}>Log In</MenuItem>
                    </div>
                : 
                <div></div>} 
                {auth.id != '' ? <MenuItem onClick={logout}>Log Out</MenuItem> :  <div></div>} 
              </Menu>
            </div>
          
        </Toolbar>
      </AppBar>
    </Box>
  );
}
