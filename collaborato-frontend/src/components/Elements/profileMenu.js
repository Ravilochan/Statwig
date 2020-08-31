import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { Link } from "react-router-dom";
import * as UTIL from './../../util/utils';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {history} from "../../util/utils";

export default function ProfileMenu() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleLogout = () => {
    UTIL.deleteServerToken();
    history.push('/')
  }
  let username = '';
  if(localStorage.getItem('username'))
    {
      username = localStorage.getItem('username').charAt(0)
    }
  return (
    <div>
      <button className = "avatar" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        {username}
      </button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick={handleClose} component={Link} to="/profile">Profile</MenuItem>
        <MenuItem onClick={handleClose} component={Link} to="/dashboard">Dashboard</MenuItem>
        <MenuItem onClick={handleLogout}>Logout</MenuItem>
      </Menu>
    </div>
  );
}
