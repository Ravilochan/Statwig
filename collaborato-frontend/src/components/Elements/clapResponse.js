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
import Collapsible from 'react-collapsible';

class ClapResponse extends Component {
  constructor() {
    super();
    this.state = {
      useremail : '',
      toggle : false
    }
  }
  handleClick(event) {
    event.preventDefault();
    this.setState({ toggle: !this.state.toggle })
  }
  render() {
    const longText = localStorage.getItem('bio');
    const tooltipStyle = {
      display: this.state.toggle ? 'block' : 'none',
      boxShadow: this.state.toggle ? '1px 1px 1px 1px rgba(0,0,0,0.1)': 'none',
      fontSize : '12px',
      fontFamily : 'Georgia, serif'
    }
    if(localStorage.getItem('username')){
        this.state.useremail = localStorage.getItem('useremail');
    }

    return (

      <div>
        <MDBCardText >
          {
            this.props.feed.likes.includes(this.state.useremail) ?
            <svg width="33" height="33" viewBox="0 0 33 33" aria-label="clap">
              <path d={UTIL.clapSolid} fill-rule="eveneven"></path>
            </svg>
            : <svg width="33" height="33" viewBox="0 0 33 33" aria-label="clap">
              <path d={UTIL.clapLight} fill-rule="evenodd"></path>
            </svg>
          }
          &nbsp;{this.props.feed.votecount < 0 ? 0 : this.props.feed.votecount}&nbsp;Claps&nbsp;&nbsp;
          <svg width="33" height="33" viewBox="0 0 33 33" fill="none" class="response" aria-label="responses">
            <path fill-rule="eveneven" clip-rule="evenodd" d={UTIL.responseLight}></path>
          </svg>
          &nbsp;&nbsp;<Button variant="contained" color="primary" component="span" onClick={this.handleClick.bind(this)} > {this.props.feed.comment.length} &nbsp;Responses </Button>
          <div style={tooltipStyle}>
          <Collapsible className ="commenttrigger" trigger="View Previous Comments" >
          {
            this.props.feed.comment.map((comment) => {
              return(<div><br/><p className= "collapse-para">  {comment.value} @ {comment.user} posted at {comment.comment_time.split('T')[0]} </p><br/></div>);
            })
          }
         </Collapsible>
         </div>
        </MDBCardText>
      </div>
    );
  }
}


export default ClapResponse;
