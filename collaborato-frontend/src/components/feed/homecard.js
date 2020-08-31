import React,{ Component } from 'react';
import './feed.css';
import DropDown from "../Elements/dropdown.js";
import Example from "../Elements/example.js";
import IdeaDescription from "../Elements/ideaDescription.js";
import ClapResponse from "../Elements/clapResponse.js";
import HoverUserBio from "../Elements/hoverUserBio.js";
import Response from "../Elements/response.js";
import FavoriteIcon from "../Elements/favoriteIcon.js";
import {history} from "../../util/utils";
import {Link} from 'react-router-dom';
import * as UTIL from "../../util/utils";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {ideaSelect} from './../../api/Api';
import { connect } from "react-redux";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow,MDBIcon,MDBCardGroup } from 'mdbreact';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';

class HomeCard extends Component {
  constructor() {
    super();
    this.state = {
      showError: false
    }
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    this.setState((prevState, props) => {
      return { showError: !prevState.showError }
    })
    if(this.props.feed.idea_type == 'Sale' || this.props.feed.idea_type == 'OPEN_IDEA') {
      this.props.ideaSelect(this.props.feed);
    }
  }
  render() {
    const imageURL = UTIL.getImageURL(this.props.feed.idea_field);
    let continueRead= <h4> "...continue reading" </h4>
    this.props.feed.page = 'home';
    return (
            <div>
            <MDBCardGroup className = "shadowingcontainer">
              <MDBCard className ="innercard">
                <MDBCardBody className = "cardbody">
                <FavoriteIcon feed = {this.props.feed}/>
                <DropDown feed = {this.props.feed}/>
                  <MDBCardTitle tag="h3">{this.props.feed.idea_field}</MDBCardTitle>
                  {this.state.showError && <div className="error-message">Locked Idea.Contact owner.!!</div>}
                  <MDBCardTitle className = "headlinecard"tag="h4">
                  <Link to="/detail"
                    onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
                    className="idea-headline"
                    >{this.props.feed.idea_headline}</Link>
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </MDBCardTitle>
                  <IdeaDescription feed = {this.props.feed}/>
                  <br/>
                  <HoverUserBio feed = {this.props.feed}/>
                  <br/>
                  <ClapResponse feed = {this.props.feed}/>
                </MDBCardBody>
                <MDBCardBody>
                  {
                    this.props.feed.idea_type == 'Not-On-Sale' || this.props.feed.idea_type == 'LOCKED_IDEA' ?
                    <svg className="svgCard" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"/></svg>: <img className="imageCard" src={UTIL.getImageURL(this.props.feed.idea_field, this.props.random)}/>
                  }
                </MDBCardBody>
              </MDBCard>
              </MDBCardGroup>
            </div>
    );
  }
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch of details page",dispatch);
    return bindActionCreators({ ideaSelect : ideaSelect}, dispatch);
}
export default connect(null,matchDispatchToProps)(HomeCard);
