import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaComment, ideaVote, ideaDownVote, ideaRecommendation} from './../../api/Api';
import Navbar from './../navbar/Navbar.jsx';
import Favorite from './favorite.js'
import Reload from './reload.js'
import { BoxLoading } from 'react-loadingg';
import Collapsible from 'react-collapsible';

class FavoriteCard extends Component {
  constructor() {
    super();
    this.state = {
      loading : true,
      commentValue : '',
    };
    this.selectedIdea = {};
    this.handleComment = this.handleComment.bind(this);
  }
  handleLike() {
    this.selectedIdea.likes = 'surabhisinha3108@gmail.com';
    this.props.ideaVote(this.selectedIdea);
  }
  handleDisLike() {
    this.selectedIdea.dislikes = 'surabhisinha3108@gmail.com';
    this.props.ideaDownVote(this.selectedIdea);
  }

  handleComment() {
    this.selectedIdea.comment = {};
    // alert(this.props.feed.comment.value);
    this.selectedIdea.comment.value =  this.state.commentValue;
    this.selectedIdea.comment.user = 'Surabhi';
    this.selectedIdea.comment.comment_time = new Date();
    this.props.ideaComment(this.selectedIdea);
  }
  componentWillMount() {
    console.log("this.props.recommendation : " +this.props.favoriteIdea);
    this.selectedIdea = this.props.favoriteIdea;
    // this.props.ideaRecommendation(this.selectedIdea._id);
  }
  render() {
    return(
      <div>
        <Navbar/>
        <div className = "detail-class">
        <h3> Favorited Ideas </h3>
        <div style={{ 'margin-top':'30px', 'box-shadow': '0 0 0 1px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.2)'}}>
        {
          this.selectedIdea != undefined ?
          this.selectedIdea.map((feed) => {
            return(<Favorite feed={feed}/>);
          })  : ''
        }
        </div>
          <hr/>
          </div>
        </div>
      );
  }
}


  function mapStateToProps(state) {
    console.log("State",state);
      return {
         feedDetails: state.FeedReducer.feedDetails,
         recommendation : state.FeedReducer.recommendation,
         loading : state.FeedReducer.loading,
         favoriteIdea : state.FeedReducer.favoriteIdea,
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaComment: ideaComment, ideaVote : ideaVote, ideaDownVote : ideaDownVote, ideaRecommendation : ideaRecommendation}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(FavoriteCard);
