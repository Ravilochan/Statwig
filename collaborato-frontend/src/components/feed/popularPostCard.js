import React,{ Component } from 'react';
import './feed.css';
import {history} from "../../util/utils";
import {Link} from 'react-router-dom';
import * as UTIL from "../../util/utils";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {getFeed,ideaSelect} from './../../api/Api';
import { connect } from "react-redux";

class PopularPostCard extends Component {
  constructor() {
    super();
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
  }

  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    this.props.ideaSelect(this.props.feed);
  }
  render() {
    const date = new Date(this.props.feed.posted_date);
    const postDate = new Intl.DateTimeFormat('en-US').format(date).split('/');
    const formatDate = postDate[1] + " " +UTIL.getMonth(postDate[0]) + ", " + postDate[2];
    return (
            <div>
                <tr>
                    <td className= "headline-class"> <Link to="/detail"
                      onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
                      className="idea-headline"
                      >{this.props.feed.idea_headline}</Link></td>
                </tr>
                <tr>
                  <h4> &nbsp;&nbsp; {this.props.feed.idea_owner_name} &nbsp;&nbsp; {formatDate} </h4>
                </tr>
                <hr className= "arrow-horizontal"/>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        feedDetails : state.FeedReducer.filteredfeedDetails,
     };
  };

function mapDispatchToProps(dispatch) {
      return bindActionCreators({ getFeed : getFeed, ideaSelect : ideaSelect}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularPostCard);
