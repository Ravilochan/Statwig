import React, { Component } from "react";
import { Link } from "react-router-dom";
import "./navbar.css";
import axios from "axios";
import {history} from "../../util/utils";
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as UTIL from './../../util/utils';
import {getFilteredFeed} from './../../api/Api';
import ProfileMenu from "../Elements/profileMenu.js";
import {NotificationContainer, NotificationManager} from 'react-notifications';

class LoginNavbar extends Component {
  handleClick = e => {
    e.preventDefault();
    history.push('/');
  }
  render() {
    if(localStorage.getItem('JWT-TOKEN') == null){
      // NotificationManager.info( 'Please login/signup to view posts');
          localStorage.setItem("username","surabhi")
          localStorage.setItem("useremail","surabhisinha3108@gmail.com")
          localStorage.setItem("bio","")
          localStorage.setItem("JWT-TOKEN", "$2a$12$A4s3T4BcR5ZQyYsVnkuIn.Fz.gUy.vYByx1cvy48Iu2PxxgEzL1sW")
    }

    return (
      <React.Fragment>
        <nav
          id="extended-nav"
          role="banner"
          tabindex="-1"
          style={{ height: 65, background: "#283e4a" }}
        >
              <h5
                style={{
                  display : "inline-block",
                  marginLeft: "1%" ,
                  marginTop : "1%",
                  color : "white",
                  textAlign: "center"}}
                  className="banner-logo"
                  >
                  Collaborato </h5>
                  <button
                      className="login-button"
                      onClick={this.handleClick}>
                    Login
                  </button>
                  <NotificationContainer/>
        </nav>
      </React.Fragment>
    );
  }
}


export default LoginNavbar;
