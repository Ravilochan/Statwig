import React , { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {reportAbuseIdea, dismissIdea, muteAuthor} from './../../api/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';

const styles = theme => ({
  menuItem: {
    '&:hover': {
      background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
      background: '#21618C',
      border: 0,
      borderRadius: 3,
      color: 'white',
      height: 28,
    },
  },
  primary: {},
  icon: {},
});

function DropDown(props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { classes } = props;
  // const [feed] = React.useState(props);
  let [alert] = React.useState(null);
  useEffect(() => {
   console.log("feed : " +props.feed._id);
 });


  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleReport = (event, id) => {
    event.preventDefault();
    var data = {};
    data._id = id;
    data.user = localStorage.getItem('useremail');
    reportAbuseIdea(data);
    handleClose();
  }

  const handleDismiss = (event, data) => {
    event.preventDefault();
    props.dismissIdea(data);
    handleClose();
  }

  const handleMuteAuthor = (event, data) => {
    event.preventDefault();
    props.muteAuthor(data);
    handleClose();
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
        <MenuItem  className={classes.menuItem} onClick={(event) => handleMuteAuthor(event, props.feed.idea_owner)}>Mute Author</MenuItem>
        <MenuItem  className={classes.menuItem} onClick={(event) => handleReport(event, props.feed._id)}>Report Post</MenuItem>
        <MenuItem  className={classes.menuItem} onClick={(event) => handleDismiss(event, props.feed._id)}>Dismiss Post</MenuItem>
      </Menu>
      <NotificationContainer/>
    </div>
  );
}

DropDown.propTypes = {
  classes: PropTypes.object.isRequired,
};


const mapStateToProps = state => {
    return {
        feed : state.FeedReducer.filteredfeedDetails,
     };
  };
function mapDispatchToProps(dispatch) {
      return bindActionCreators({ dismissIdea : dismissIdea , muteAuthor : muteAuthor}, dispatch);
}

export default connect(null, mapDispatchToProps)(withStyles(styles)(DropDown));
