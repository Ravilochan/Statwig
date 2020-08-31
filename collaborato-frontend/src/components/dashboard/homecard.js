import React,{ Component } from 'react';
import './feed.css';
import DropDown from "./dropdown.js";
import IdeaDescription from "./ideaDescription.js";
import ClapResponse from "../Elements/clapResponse.js";
import HoverUserBio from "../Elements/hoverUserBio.js";
import Response from "../Elements/response.js";
import FavoriteIcon from "../Elements/favoriteIcon.js";
import {history} from "../../util/utils";
import {Link} from 'react-router-dom';
import * as UTIL from "../../util/utils";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {getFeed} from './../../api/Api';
import { connect } from "react-redux";
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow,MDBIcon,MDBCardGroup } from 'mdbreact';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';
import Button from '@material-ui/core/Button';
import {markAsSold} from './../../api/Api';


class HomeCard extends Component {
  constructor() {
    super();
    this.state = {
      showError: false
    }
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
    this.handleSellIdea = this.handleSellIdea.bind(this);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    this.setState((prevState, props) => {
      return { showError: !prevState.showError }
    })
    if(this.props.feed.idea_type == 'Sale') {
      history.push({
        pathname: '/detail',
        state: { detail: this.props.feed}
      })
    }
  }
  handleSellIdea = (ID,e) => {
    e.preventDefault();
    markAsSold(ID)
    console.log("Marked as Sold")
  }
  render() {
    const imageURL = UTIL.getImageURL(this.props.feed.idea_field);
    let continueRead= <h4> "...continue reading" </h4>
    this.props.feed.page = 'home';
    let button =  null
    
    if(this.props.feed.status == true)
      button = <Button variant="contained" color="secondary" onClick = {this.handleSellIdea.bind(this, this.props.feed._id)}>MARK AS SOLD</Button> 
    else 
      button = <Button variant="contained" disabled>SOLD</Button> 
    return (
            <div>
            <MDBCardGroup className = "shadowingcontainer">
              <MDBCard className ="innercard">
                <MDBCardBody className = "cardbody">
                <FavoriteIcon feed = {this.props.feed}/>
                <DropDown/>
                  <MDBCardTitle tag="h3">{this.props.feed.idea_field}</MDBCardTitle>
                
                  <MDBCardTitle className = "headlinecard"tag="h4"> <Link to="/detail"
                    onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
                    >{this.props.feed.idea_headline}</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </MDBCardTitle>
                  <IdeaDescription feed = {this.props.feed}/>
                  <br/>
                  <HoverUserBio feed = {this.props.feed}/>
                  <br/>
                  {button}
                  <br/>
                </MDBCardBody>
                <MDBCardBody>
                {
                  <img className="imageCard" src={UTIL.retrievePropertyImages(this.props.random)}/>
                }
              </MDBCardBody>

              </MDBCard>
              </MDBCardGroup>
            </div>
    );
  }
}

export default (HomeCard);
