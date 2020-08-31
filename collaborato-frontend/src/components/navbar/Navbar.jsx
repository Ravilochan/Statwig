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

class Navbar extends Component {
  constructor() {
    super();
    this.userDetails={};
    this.state = {
      ID : '',
      username : 'Login',
    };
    this.handleClick = this.handleClick.bind(this);
  }
  searchIdeas = e => {
    this.props.getFilteredFeed(this.state.ID);
  };
  handleClick = e => {
    e.preventDefault();
    history.push('/feed');
  }
  //http://localhost:3002/messages
  Open = () => { 
    window.open("http://localhost:3002/collab", "_blank"); 
} 
  render() {
      const bio = 'Data Visualisation Designer 📊 • Co-host of Data Vis Paris Meetup • Tableau Public Featured Author • Public Speaking Trainer 🎙 • www.evelina-judeikyte.com'
      // localStorage.setItem("username",'Surabhi Sinha')
      // localStorage.setItem("useremail",'surabhisinha3108@gmail.com')
      // localStorage.setItem("bio",bio);
      if(localStorage.getItem('username'))
        {
          this.state.username = localStorage.getItem('username').charAt(0)
        }
      localStorage.setItem("bio",bio);
    return (
      <React.Fragment>
        <nav
          id="extended-nav"
          role="banner"
          tabindex="-1"
          style={{ height: 65, background: "#283e4a" }}
        >
          <Link to="/feed">
          <span>
              <h5
                style={{
                  display : "inline-block",
                  marginLeft: "1%" ,
                  color : "white",
                  textAlign: "center"}}
                  className="banner-logo"
                  >
                  Collaborato </h5>
              <input style={{ marginLeft : 10 , "width" : "400px"}} type="text" list="searchtype" onChange={(event) => { this.setState({ID : event.target.value})  }} />
            <img
              onClick={this.searchIdeas}
              style={{ width: 40}}
              src="https://fcpp.org/sites/default/files/images/search-icon.png"
            />
          </span>
          </Link>
          <Link to="/postIdea">
            <div
              style={{
                display: "inline-block",
                paddingTop: "10px",
                marginLeft: 200,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span style={{ display: "inline-block" }}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{ color: "white", width: "24px", height: "24px" }}
                  viewBox="0 0 24 24"
                  preserveAspectRatio="xMinYMin meet"
                  focusable="false"
                >
                  <path
                    d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm-5 17l1.006-4.036 3.106 3.105-4.112.931zm5.16-1.879l-3.202-3.202 5.841-5.919 3.201 3.2-5.84 5.921z"
                    style={{ fill: "#e1e9ee" }}
                    />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Create Post
                </div>
              </span>
            </div>
          </Link>
          <Link to="/favorites">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="jobs-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 5c-1.629 0-2.305-1.058-4-3h-7v20h24v-17h-13zm3.599 12l-2.599-1.39-2.599 1.39.518-2.902-2.125-2.042 2.921-.404 1.285-2.652 1.285 2.652 2.921.404-2.125 2.042.518 2.902z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Favorites
                </div>
              </span>
            </div>
          </Link>
          <a>
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="messaging-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22 3v13h-11.643l-4.357 3.105v-3.105h-4v-13h20zm2-2h-24v16.981h4v5.019l7-5.019h13v-16.981zm-5 6h-14v-1h14v1zm0 2h-14v1h14v-1zm-6 3h-8v1h8v-1z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                 <a onClick={this.Open}>Messaging</a> 
                </div>
              </span>
            </div>
          </a>
          <Link to="/trends">
            <div
              style={{
                display: "inline-block",
                marginLeft: 30,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="notifications-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 3.055l-6 1.221 1.716 1.708-5.351 5.358-3.001-3.002-7.336 7.242 1.41 1.418 5.922-5.834 2.991 2.993 6.781-6.762 1.667 1.66 1.201-6.002zm-16.69 6.477l-3.282-3.239 1.41-1.418 3.298 3.249-1.426 1.408zm15.49 3.287l1.2 6.001-6-1.221 1.716-1.708-2.13-2.133 1.411-1.408 2.136 2.129 1.667-1.66zm1.2 8.181v2h-24v-22h2v20h22z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Analytics
                </div>
              </span>
            </div>
          </Link>
          <Link to="/cart">
            <div
              style={{
                display: "inline-block",
                marginLeft: 20,
                textAlign: "center"
              }}
              className="nav-home"
            >
              <span
                id="jobs-tab-icon"
                class="nav-item__icon"
                lang="en"
                aria-role="presentation"
              >
                <svg
                  viewBox="0 0 24 24"
                  style={{ width: "24px", height: "24px" }}
                  x="0"
                  y="0"
                  preserveAspectRatio="xMinYMin meet"
                  class="nav-icon"
                  focusable="false"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"
                    class="inactive-item"
                    style={{ fill: "#e1e9ee" }}
                  />
                </svg>
              </span>
              <span>
                <div
                  style={{
                    display: "block",
                    "font-size": "0.85rem",
                    "font-weight": 400,
                    color: "#c7d1d8"
                  }}
                >
                  Cart
                </div>
              </span>
            </div>
          </Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <ProfileMenu name = {this.state.username}/>
        </nav>
      </React.Fragment>
    );
  }
}
const mapStateToProps = (state) =>{
    return {
        // currentUserDetails : state.LoginReducer.currentUserDetails,
        // searchCriteria : state.LoginReducer.searchCriteria
    }
}
function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({getFilteredFeed : getFilteredFeed}, dispatch);
}

export default connect(mapStateToProps,matchDispatchToProps)(Navbar);
