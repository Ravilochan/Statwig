import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaComment, ideaVote, ideaDownVote, ideaRecommendation} from './../../api/Api';
import Navbar from './../navbar/Navbar.jsx';
import IdeaCard from './ideaCard.js'
import Reload from './reload.js'
import { BoxLoading } from 'react-loadingg';
import Collapsible from 'react-collapsible';
import PopularPost from './popularPost.js';

class FeedDetail extends Component {
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
    console.log("this.props.recommendation : " +this.props.recommendation);
    this.selectedIdea = this.props.location.state.detail;
    this.props.ideaRecommendation(this.selectedIdea._id);
  }
  render() {
    return(
      <div>
        <Navbar/>
        <div className = "centralDiv">
        <div className = "detail-class">
          <table>
          <tbody>
            <tr >
              <td id = "idea"><img className="photo" src="https://pluspng.com/img-png/user-png-icon-male-user-icon-512.png"/> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.selectedIdea.idea_owner_name} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.selectedIdea.posted_date.split('T')[0]} &nbsp;&nbsp;&nbsp;&nbsp;
                {this.selectedIdea.posted_date.split('T')[1].split('.')[0]} &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                {this.selectedIdea.idea_type}</td>
              <td> </td>
            </tr>
            <tr>
              <td>   </td>
            </tr>
            <tr>
              <td>{this.selectedIdea.idea_headline}</td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;</td>
            </tr>
            <tr>
              <td> {this.selectedIdea.idea_description}</td>
            </tr>
            <tr>
              <td>&nbsp;&nbsp;</td>
            </tr>
          </tbody>
          </table>
          <input type="text" className="comment-filter" id="comment" placeholder="Comment Here"
                                onChange={(userinput) => { this.setState({commentValue : userinput.target.value})}}/>
          <button type="button" onClick={() => this.handleComment()} className="btn-class commentIdea">Comment</button>
          <Collapsible trigger="View Previous Comments" >
          {
            this.selectedIdea.comment.map((comment) => {
              return(<div><br/><p className= "collapse-para">  {comment.value} @ {comment.user} posted at {comment.comment_time.split('T')[0]} </p><br/></div>);
            })
          }
         </Collapsible>
          <br/><br/>
          <hr/>

          {
            this.props.recommendation != undefined ?
            <h3> You might be interested in reading below ideas <br/><br/><br/></h3>: ""
          }
          {
            this.props.recommendation.length != undefined ?
            this.props.recommendation.map((feed) => {
              return(<IdeaCard feed={feed}/>);
            })  : ""
          }
          {
            this.props.loading == true ?
            <Reload/>: ''
          }
          </div>
        </div>
        <div className = "rightDiv">
          <PopularPost/>
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
         loading : state.FeedReducer.loading
      };
  }

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaComment: ideaComment, ideaVote : ideaVote, ideaDownVote : ideaDownVote, ideaRecommendation : ideaRecommendation}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(FeedDetail);
