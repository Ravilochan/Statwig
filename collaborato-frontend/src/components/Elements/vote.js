import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {ideaVote, ideaDownVote} from './../../api/Api';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap'
import {MDBCardText } from 'mdbreact';
import * as UTIL from "../../util/utils";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Collapsible from 'react-collapsible';

class Vote extends Component {

  handleLike() {
    var data = Object.assign({}, this.props.feed);
    data.likes = localStorage.getItem('useremail');
    this.props.ideaVote(data);
  }

  handleDisLike() {
    var data = Object.assign({}, this.props.feed);
    data.dislikes = localStorage.getItem('useremail');
    this.props.ideaDownVote(data);
  }

  render() {
    var userEmail = localStorage.getItem('useremail');
    const likeflag = this.props.feed.likes == undefined ? false : this.props.feed.likes.includes(userEmail);
    const dislikeflag = this.props.feed.dislikes == undefined ? false : this.props.feed.dislikes.includes(userEmail);
    return (
        <MDBCardText>
        &nbsp;&nbsp;&nbsp;&nbsp;
              {
                likeflag ?
                <svg onClick={this.handleLike.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d={UTIL.likeSolid}/>
                </svg>
                : <svg onClick={this.handleLike.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d={UTIL.likeLight} />
                </svg>
              }
              &nbsp;&nbsp;&nbsp;&nbsp; {this.props.feed.likes == undefined ? '':this.props.feed.likes.length} &nbsp;Likes
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              {
                dislikeflag ?
                <svg onClick={this.handleDisLike.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d={UTIL.dislikeSolid}/>
                </svg>
                : <svg onClick={this.handleDisLike.bind(this)} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path d={UTIL.dislikeLight} />
                </svg>
              }
              &nbsp;&nbsp;&nbsp;&nbsp;{this.props.feed.dislikes == undefined ? '' : this.props.feed.dislikes.length} &nbsp; Dislikes

        </MDBCardText>
    );
  }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       filteredFavoriteIdea : state.FeedReducer.filteredFavoriteIdea,
       feed : state.FeedReducer.selectedIdea,
       likeUpdate : state.FeedReducer.likeUpdate,
       dislikeUpdate : state.FeedReducer.dislikeUpdate
    };
}


function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaVote : ideaVote, ideaDownVote : ideaDownVote}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Vote);
