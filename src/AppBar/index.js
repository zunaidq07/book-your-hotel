import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import HomeIcon from '@material-ui/icons/Home';
import './AppBar.scss'
import fire from '../config/Fire';

export default function MenuAppBar(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    fire.auth().signOut();
  }

  const handleBookings = () => {
    props.handleBookings(true);
    setAnchorEl(null);
  }

  const handleProfile = () => {
    props.handleProfile(true);
    setAnchorEl(null);
  }

  return (
    <div>
      <AppBar position="static">
          <div className="navigation-item">
            <h2 className="brand-title"><a href="/"><HomeIcon fontSize="large"/><span>Book Your Hotel</span></a></h2>
            <div className='profile-details'>
              <IconButton
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
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleProfile}>Profile</MenuItem>
                <MenuItem onClick={handleBookings}>MyBookings</MenuItem>
                <MenuItem onClick={handleSignOut}>Logout</MenuItem>
              </Menu>
            </div>
        </div>
      </AppBar>
    </div>
  );
}
