import React,{ Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaComment, ideaVote, ideaDownVote, ideaFavorite} from './../../api/Api';
import {history} from "../../util/utils";
import Collapsible from 'react-collapsible';

class Favorite extends Component {
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
      <div>
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
          <td> </td>
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
         feedDetails: state.FeedReducer.feedDetails,
         favoriteIdea : state.FeedReducer.favoriteIdea,
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaComment: ideaComment, ideaVote : ideaVote, ideaDownVote : ideaDownVote, ideaFavorite : ideaFavorite}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Favorite);
