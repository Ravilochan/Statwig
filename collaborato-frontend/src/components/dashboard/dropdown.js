import React from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export default function DropDown() {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsSold = (ID) => {
    console.log("hello")
    setAnchorEl(null);

  }

  return (
    <div>
      <Button className = "more-btn" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <MoreHorizIcon/>
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem onClick = {handleClose}>Mark as Sold</MenuItem>
        <MenuItem onClick={handleClose}>Dismiss Post</MenuItem>
      </Menu>
    </div>
  );
}


