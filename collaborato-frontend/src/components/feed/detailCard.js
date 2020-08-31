import React,{ Component } from 'react';
import './feed.css';
import DropDown from "../Elements/dropdown.js";
import IdeaDescription from "../Elements/ideaDescription.js";
import Response from "../Elements/response.js"
import FavoriteIcon from "../Elements/favoriteIcon.js";
import HoverUserBio from "../Elements/hoverUserBio.js";
import Vote from "../Elements/vote.js";
import {history} from "../../util/utils";
import {Link} from 'react-router-dom';
import * as UTIL from "../../util/utils";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {getFeed} from './../../api/Api';
import { connect } from "react-redux";
import {ideaComment, ideaVote, ideaDownVote, ideaRecommendation,addProducts} from './../../api/Api';
import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow,MDBIcon,MDBCardGroup } from 'mdbreact';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { Button } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import {ID_USER} from './../constants/constants.js';

class DetailCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showError: false,
      cart : {
      },
      user : {
      },
      cartButton : false
    }
    this.handleAddCart = this.handleAddCart.bind(this);
  }

  componentDidMount(){
    var myHeaders = new Headers();
myHeaders.append("Cookie", "connect.sid=s%3Adpcu2ngZX9tfc9EW5RzcJHw-hFyVNmVR.Z6TY4x9TVQeSUooUwFsmLQIo5n2cy7op35zTPTHF3W0");

var requestOptions = {
  method: 'GET',
  headers: myHeaders,
  redirect: 'follow'
};

    console.log("CARD LOADED")
    var url = 'http://localhost:8102/api/getactivity?headline='+this.props.feed.idea_headline+'&owner='+this.props.feed.idea_owner
    console.log("URL = ",url)
        fetch(url, requestOptions)
        .then(response => response.json())
        .then(poststatus => {
          var count = poststatus.visitCount
          count=count+1
        var url = 'http://localhost:8102/api/postactivity'
        fetch(url, {
          method: 'post',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            idea_headline: this.props.feed.idea_headline,
            idea_owner: this.props.feed.idea_owner,
            visitCount: count
           })
        })
        .then(response => {
          if(response.status==200)
          {
              console.log("Click Tracked")
          }
          else
          {
            alert("Click Not Tracked")
          }
      })
    })

}
  handleAddCart(event){
    event.preventDefault();
    this.state.cart._id = this.props.feed._id;
    this.state.cart.idea_owner = this.props.feed.idea_owner,
    this.state.cart.idea_owner_name = this.props.feed.idea_owner_name,
    this.state.cart.idea_genre = this.props.feed.idea_genre,
    this.state.cart.idea_headline = this.props.feed.idea_headline,
    this.state.cart.idea_description = this.props.feed.idea_description,
    this.state.cart.price = '200'
    this.state.user._id = ID_USER;
    this.props.addProducts(this.state);
    NotificationManager.success( 'Idea Successfully Added to Cart');
    this.setState({
      cartButton : !(this.state.cartButton)
    })
  }
  handleEditCart(event) {
    event.preventDefault();
    history.push('/cart');
  }
  render() {
    let continueRead= <h4> "...continue reading" </h4>
    return (
            <div>
            <MDBCardGroup className = "detailContainer">
              <MDBCard className ="innercard">
                <MDBCardTitle className = "headline" tag="h1">
                  {this.props.feed.idea_headline}
                  {
                    this.state.cartButton ? <Button className = "cartadd" onClick ={this.handleEditCart.bind(this)} color="info" size = "sm">Edit Cart&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg>
                   </Button>
                    :
                    <Button className = "cartadd" onClick ={this.handleAddCart.bind(this)} color="info" size = "sm">Add to Cart&nbsp;
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 3l-.743 2h-1.929l-3.474 12h-13.239l-4.615-11h16.812l-.564 2h-13.24l2.937 7h10.428l3.432-12h4.195zm-15.5 15c-.828 0-1.5.672-1.5 1.5 0 .829.672 1.5 1.5 1.5s1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5zm6.9-7-1.9 7c-.828 0-1.5.671-1.5 1.5s.672 1.5 1.5 1.5 1.5-.671 1.5-1.5c0-.828-.672-1.5-1.5-1.5z"/></svg>
                   </Button>
                  }
                </MDBCardTitle>
                <MDBCardBody className = "cardbodyDetail">
                  <FavoriteIcon feed = {this.props.feed}/>
                  <HoverUserBio feed = {this.props.feed}/>
                  <br/>
                  <MDBCardTitle className = "descriptionDetail" tag="h4">{this.props.feed.idea_description}</MDBCardTitle>
                  <br/>
                  <Vote/>
                  <Response/>
                  <NotificationContainer className = "notification"/>
                </MDBCardBody>
              </MDBCard>
              </MDBCardGroup>
            </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       feed: state.FeedReducer.selectedIdea
    };
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({addProducts: addProducts}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(DetailCard);
