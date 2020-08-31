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
import {ideaNotDuplicate,deleteIdea} from './../../api/Api';


class HomeCard extends Component {
  constructor() {
    super();
    this.state = {
      showError: false
    }
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
    this.handleSellIdea = this.handleSellIdea.bind(this);
    this.deleteIdea = this.deleteIdea.bind(this);

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
  handleSellIdea = (data,e) => {
    e.preventDefault();
    ideaNotDuplicate(data);
  }

  deleteIdea = (data,e) =>{
    deleteIdea(data)
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
                <DropDown/>
                  <MDBCardTitle tag="h3">Title{this.props.feed.idea_field}</MDBCardTitle>
                
                  <MDBCardTitle className = "headlinecard"tag="h4"> <Link to="/detail"
                    onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
                    >{this.props.feed.idea_headline}</Link>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </MDBCardTitle>
                  <IdeaDescription feed = {this.props.feed}/>
                  {
                    this.props.feed.similarheadline != null && 
                    <MDBCardTitle tag="h4">Similar Idea Headline : {this.props.feed.similarheadline}</MDBCardTitle>
                  }
                  {
                    this.props.feed.similardescription != null && 
                    <MDBCardTitle tag="h4">Similar Idea Description : {this.props.feed.similardescription}</MDBCardTitle>
                  }
                  
                 
                  <br/>
                  <HoverUserBio feed = {this.props.feed}/>
                  <br/>
                  <Button variant="contained" color="primary" onClick = {this.handleSellIdea.bind(this, this.props.feed)}>MARK AS NOT DUPLICATE</Button> 
                  <Button variant="contained" color="secondary" onClick = {this.handleSellIdea.bind(this, this.props.feed)} style={{"margin-left":"30px"}}>MARK AS DUPLICATE</Button>
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
