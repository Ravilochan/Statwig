import React,{ Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import Popover, { ArrowContainer } from 'react-tiny-popover'
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
// import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import StyledButton from './materialButton.js';
import MessageButton from './messageButton.js';
import { Button } from 'reactstrap';
class ToolTip extends Component {
constructor() {
  super();
}

gotoUserProfile = () =>{
  localStorage.setItem("nonusername", this.props.feed.idea_owner_name)
}


  

  render() {
    const longText = localStorage.getItem('bio');
      return(
        <div className = "tooltip-container">
          <h2><b> {this.props.feed.idea_owner_name} </b></h2>
          <p>{longText}</p>
          <hr/>
          <i> Followed by 3 people </i>
          <Link to="/user/details"
            onClick = {()=>this.gotoUserProfile()}
            ><StyledButton text={"View Profile and Connect"}/></Link>
      </div>
    )
  }
}
export default (ToolTip);
