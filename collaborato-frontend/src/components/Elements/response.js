import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import {ideaComment} from './../../api/Api';
import "bootstrap/dist/css/bootstrap.min.css";
import { Dropdown } from 'react-bootstrap'
import {MDBCardText } from 'mdbreact';
import * as UTIL from "../../util/utils";
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import { makeStyles } from '@material-ui/core/styles';
import Collapsible from 'react-collapsible';
import { Button } from 'reactstrap';
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

class Response extends Component {
  constructor() {
    super();
    this.state = {
      toggle : false,
      commentValue : '',
      feeds : []
    }
    this.handleClick = this.handleClick.bind(this);
  }
  handleClick(event) {
    event.preventDefault();
    this.setState({ toggle: !this.state.toggle })
  }

  handleComment() {
    if(this.state.commentValue != '') {
      var data = {
        _id : this.props.feed._id
      }
      var comment = {
        value : this.state.commentValue,
        user : localStorage.getItem('username'),
        comment_time : new Date()
      };
      data.comment = comment;
      this.props.ideaComment(data);
      NotificationManager.success( 'Comment posted successfully');
    }
    else {
      NotificationManager.warning( 'Enter Comment before submitting');
    }
  }
  render() {
    const tooltipStyle = {
      display: this.state.toggle ? 'block' : 'none',
      boxShadow: this.state.toggle ? '1px 1px 1px 1px rgba(0,0,0,0.1)': 'none'
    }
    return (
        <MDBCardText >
          &nbsp;&nbsp;<Button color="info" className = "btn" size = "lg" onClick={this.handleClick.bind(this)} >&nbsp;&nbsp;{this.props.feed.comment == undefined ? '':this.props.feed.comment.length} &nbsp;Responses</Button>
          <div style={tooltipStyle}>
          <form>
          <input type="text" className="comment-filter" placeholder="Comment Here" required
                          onChange={(userinput) => { this.setState({commentValue : userinput.target.value})}}/>
          &nbsp;&nbsp; &nbsp;&nbsp;<Button type="reset" value="Reset" color="secondary" onClick={() => this.handleComment()}>Comment</Button>

          </form>
          <br/>
          <Collapsible trigger="View Previous Comments" >
          {
            this.props.feed.comment == undefined ? '' :
            this.props.feed.comment.map((comment) => {
              return(<div><br/><p className= "collapse-para">  {comment.value} @ {comment.user} posted at {comment.comment_time.split('T')[0]} </p><br/></div>);
            })
          }
         </Collapsible>
         </div>
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
         &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        </MDBCardText>
    );
  }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       filteredFavoriteIdea : state.FeedReducer.filteredFavoriteIdea,
       feed : state.FeedReducer.selectedIdea,
    };
}


function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaComment: ideaComment}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Response);
