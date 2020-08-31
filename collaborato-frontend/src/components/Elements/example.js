import React,{ Component } from 'react';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {reportAbuseIdea, dismissIdea, muteAuthor} from './../../api/Api';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {bindActionCreators} from 'redux';
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import MenuList from '@material-ui/core/MenuList';
import MenuItem from '@material-ui/core/MenuItem';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';

const styles = theme => ({
  menuItem: {
    '&:focus': {
      backgroundColor: theme.palette.primary.main,
      '& $primary, & $icon': {
        color: theme.palette.common.white,
      },
    },
  },
  primary: {},
  icon: {},
});

function Example(props) {
  const { classes } = props;

    const handleReport = (event, id) => {
      event.preventDefault();
      var data = {};
      data._id = id;
      data.user = localStorage.getItem('useremail');
      reportAbuseIdea(data);
      this.handleClose();
    }

    const handleDismiss = (event, data) => {
      event.preventDefault();
      this.props.dismissIdea(data);
      this.handleClose();
    }

    const handleMuteAuthor = (event, data) => {
      event.preventDefault();
      this.props.muteAuthor(data);
      this.handleClose();
    }

  return (
    <Paper>
      <MenuList>
        <MenuItem onClick={(event) => handleMuteAuthor(event, this.props.feed.idea_owner)} className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <SendIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Mute Author" />
        </MenuItem>
        <MenuItem onClick={(event) => handleReport(event, this.props.feed._id)} className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <DraftsIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Report Post" />
        </MenuItem>
        <MenuItem onClick={(event) => handleDismiss(event, this.props.feed._id)} className={classes.menuItem}>
          <ListItemIcon className={classes.icon}>
            <InboxIcon />
          </ListItemIcon>
          <ListItemText classes={{ primary: classes.primary }} inset primary="Dismiss Post" />
        </MenuItem>
      </MenuList>
    </Paper>
  );
}

Example.propTypes = {
  classes: PropTypes.object.isRequired,
};

function matchDispatchToProps(dispatch){
    console.log("Dispatch of details page",dispatch);
    return bindActionCreators({ dismissIdea : dismissIdea , muteAuthor : muteAuthor}, dispatch);
}
export default connect(null, matchDispatchToProps)(withStyles(styles)(Example));
