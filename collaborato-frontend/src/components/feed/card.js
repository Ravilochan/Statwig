import React,{ Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaComment, ideaVote, ideaDownVote, ideaFavorite} from './../../api/Api';
import {history} from "../../util/utils";
import Collapsible from 'react-collapsible';

class Card extends Component {
  constructor() {
    super();
    this.state = {
      commentValue : ''
    }
    this.handleLike = this.handleLike.bind(this);
    this.handleDisLike = this.handleDisLike.bind(this);
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleLike() {
    this.props.feed.likes = 'surabhisinha3108@gmail.com';
    this.props.ideaVote(this.props.feed);
  }
  handleDisLike() {
    this.props.feed.dislikes = 'surabhisinha3108@gmail.com';
    this.props.ideaDownVote(this.props.feed);
  }
  handleComment() {
    this.props.feed.comment = {};
    this.props.feed.comment.value =  this.state.commentValue;
    this.props.feed.comment.user = 'Surabhi';
    this.props.feed.comment.comment_time = new Date();
    this.props.ideaComment(this.props.feed);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    console.log("CLICKED ON", this.props.feed.idea_headline)
    history.push({
      pathname: '/detail',
      state: { detail: this.props.feed}
    })
  


  }
  handleClick = e => {
    e.preventDefault();
    this.props.ideaFavorite(this.props.feed);
  }
  render() {
    return(
      <div className = "shadowingcontainer">
      <table>
      <tbody>
        <tr >
          <td id = "idea"><img className="photo" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.feed.idea_owner_name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.feed.posted_date.split('T')[0]} &nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.feed.posted_date.split('T')[1].split('.')[0]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            {this.props.feed.idea_type}</td>
          <td> </td>
        </tr>
        <tr>
          <td>   </td>
        </tr>
        <tr>
          <td>

          <Link to="/detail"
            onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
            className="idea-headline"
            >{this.props.feed.idea_headline}</Link></td>
        </tr>
        <tr>
          <td>&nbsp;&nbsp;</td>
        </tr>
        <tr>
          <td> <span
            id="jobs-tab-icon"
            class="nav-item__icon"
            lang="en"
            aria-role="presentation"
            onClick={this.handleClick}
          >
            <svg
              viewBox="0 0 24 24"
              style={{ width: "18px", height: "24px", color : 'black' }}
              x="0"
              y="0"
              preserveAspectRatio="xMinYMin meet"
              class="nav-icon"
              focusable="true"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19.5 10c-2.483 0-4.5 2.015-4.5 4.5s2.017 4.5 4.5 4.5 4.5-2.015 4.5-4.5-2.017-4.5-4.5-4.5zm2.5 5h-2v2h-1v-2h-2v-1h2v-2h1v2h2v1zm-6.527 4.593c-1.108 1.086-2.275 2.219-3.473 3.407-6.43-6.381-12-11.147-12-15.808 0-4.005 3.098-6.192 6.281-6.192 2.197 0 4.434 1.042 5.719 3.248 1.279-2.195 3.521-3.238 5.726-3.238 3.177 0 6.274 2.171 6.274 6.182 0 .746-.156 1.496-.423 2.253-.527-.427-1.124-.768-1.769-1.014.122-.425.192-.839.192-1.239 0-2.873-2.216-4.182-4.274-4.182-3.257 0-4.976 3.475-5.726 5.021-.747-1.54-2.484-5.03-5.72-5.031-2.315-.001-4.28 1.516-4.28 4.192 0 3.442 4.742 7.85 10 13l2.109-2.064c.376.557.839 1.048 1.364 1.465z"
                class="inactive-item"
                style={{ fill: "black" }}
              />
            </svg>
          </span>&nbsp;&nbsp;&nbsp;&nbsp;{this.props.feed.idea_description}</td>
        </tr>
        <tr>
          <td>&nbsp;&nbsp;</td>
        </tr>
        <tr>
          <td className = "upvote-link">
            <a href = '#' onClick={() => this.handleLike()}><img className = "upvote" src="https://img.icons8.com/material-rounded/64/000000/facebook-like.png"/>
            </a>
            {(this.props.feed.likes == null || this.props.feed.likes == undefined) ? "0 Like" : this.props.feed.likes.length +" "+ "  Likes"}
          </td>
          <td className = "downvote-link">
            {(this.props.feed.dislikes == null || this.props.feed.dislikes == undefined) ? "0 Dislike" : this.props.feed.dislikes.length + " " + "   Dislikes"}
            <a href = '#' onClick={() => this.handleDisLike()}> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img className = "downvote" src="https://img.icons8.com/material-rounded/30/000000/thumbs-down.png"/>
            </a>

          </td>
        </tr>
      </tbody>
      </table>
      <input type="text" className="comment-filter" id="comment" placeholder="Comment Here"
                            onChange={(userinput) => { this.setState({commentValue : userinput.target.value})}}/>
      <button type="button" onClick={() => this.handleComment()} className="btn-class commentIdea">Comment</button>
      <br/>
            <a>{this.props.feed.comment.length}
            <img className="edit-gly1"src=" https://cdn3.iconfinder.com/data/icons/email-51/48/53-512.png"/></a>
           <Collapsible trigger="View Previous Comments" >
           {
             this.props.feed.comment.map((comment) => {
               return(<div><br/><p className= "collapse-para">  {comment.value} @ {comment.user} posted at {comment.comment_time.split('T')[0]} </p><br/></div>);
             })
           }
          </Collapsible>
      <hr/>
      </div>
      );
  }
}


  function mapStateToProps(state) {
    console.log("State",state);
      return {
         feedDetails: state.FeedReducer.feedDetails
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaComment: ideaComment, ideaVote : ideaVote, ideaDownVote : ideaDownVote, ideaFavorite : ideaFavorite}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Card);
