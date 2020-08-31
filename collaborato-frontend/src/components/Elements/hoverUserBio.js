import React,{ Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap'
import {MDBCardText } from 'mdbreact';
import * as UTIL from "../../util/utils";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import ReactTooltip from "react-tooltip";
import PopOver from './popover.js'
import ToolTip from './tooltip.js'

class HoverUserBio extends Component {
  constructor() {
    super();
    this.state = {
      useremail : '',
      hover : false
    }
  }

  handleMouseIn() {
      this.setState({ hover: true })
    }

    handleMouseOut() {
      this.setState({ hover: false })
    }

  render() {
    const date = new Date(this.props.feed.posted_date);
    let postDate = '';
    let formatDate = '';
    if(date != 'Invalid Date') {
      postDate = new Intl.DateTimeFormat('en-US').format(date).split('/');
      formatDate = UTIL.getMonth(postDate[0]) + " "+ postDate[1] +  ", " + postDate[2];
    }
    const longText = localStorage.getItem('bio');
    const tooltipStyle = {
      display: this.state.hover ? 'block' : 'none',
      borderColor : 'black',
      border: '1px solid #ccd8e0',
      boxShadow: this.state.hover ? '1px 1px 1px rgba(0,0,0,0.01)': 'none',
      width : '90%',
      marginTop : '-10px',
      marginLeft : '0px',
      marginBottom : '10px',
      height : '100%',
    }
    const hoverStyle = {
      fontSize : '14px',
      marginLeft : '10px',
      fontFamily : 'Georgia'
    }
    if(localStorage.getItem('username')){
        this.state.useremail = localStorage.getItem('useremail');
    }
    const dateTip = "Updated at " +formatDate;
    return (
      <div>
        <MDBCardText >
          <div style={tooltipStyle}>
              <ToolTip feed = {this.props.feed}/>
          </div>
          <AccountCircleIcon />
          <i onMouseOver={this.handleMouseIn.bind(this)} onClick={this.handleMouseOut.bind(this)} style={hoverStyle}>{this.props.feed.idea_owner_name}</i>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <a style={hoverStyle} data-tip={dateTip}> {formatDate} </a>
          <ReactTooltip place="top" type="dark" effect="float"/>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </MDBCardText>
      </div>
    );
  }
}


export default HoverUserBio;
