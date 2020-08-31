import React,{ Component } from 'react';
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaComment, ideaVote, ideaDownVote, ideaSelect} from './../../api/Api';
import {history} from "../../util/utils";
import Collapsible from 'react-collapsible';

class IdeaCard extends Component {
  constructor() {
    super();
    this.handleLike = this.handleLike.bind(this);
    this.handleDisLike = this.handleDisLike.bind(this);
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
  }

  handleLike() {
    this.props.feed.likes = 'surabhisinha3108@gmail.com';
    this.props.ideaVote(this.props.feed);
  }
  handleDisLike() {
    this.props.feed.dislikes = 'surabhisinha3108@gmail.com';
    this.props.ideaDownVote(this.props.feed);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    this.props.ideaSelect(this.props.feed);
  }

  render() {
    return(
      <div className = "rec-col">
          <Link to="/detail"
            onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
            className="idea-headline"
            >{this.props.feed.idea_headline}</Link>
            <br/><br/><br/>
            &nbsp;&nbsp;
          &nbsp;&nbsp;&nbsp;&nbsp;{this.props.feed.idea_description}
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
    return bindActionCreators({ideaComment: ideaComment, ideaVote : ideaVote, ideaDownVote : ideaDownVote, ideaSelect : ideaSelect}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(IdeaCard);
