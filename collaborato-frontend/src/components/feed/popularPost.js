import React,{ Component } from 'react';
import './feed.css';
import {history} from "../../util/utils";
import {Link} from 'react-router-dom';
import * as UTIL from "../../util/utils";
import axios from "axios";
import {bindActionCreators} from 'redux';
import {getFeed, getPopularPost} from './../../api/Api';
import { connect } from "react-redux";
import PopularPostCard from './popularPostCard.js'

class PopularPost extends Component {

    componentWillMount() {
        if(this.props.popularPosts.length == 0) {
          this.props.getPopularPost();
        }
    }
  render() {
    return (
      <div className= "popular-card">
        <h3 className = "popular-class"> Popular on Collaborato </h3>
        <br></br>
            <table className="static-border">
              {
                this.props.popularPosts != undefined ?
                this.props.popularPosts.map((feed) => {
                  return(<tr><PopularPostCard feed={feed}/></tr>);
                })  : ''
              }
            </table>
      </div>
    );
  }
}
const mapStateToProps = state => {
    return {
        feedDetails : state.FeedReducer.filteredfeedDetails,
        popularPosts : state.FeedReducer.popularPost,
     };
  };

function mapDispatchToProps(dispatch) {
      return bindActionCreators({ getPopularPost : getPopularPost}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(PopularPost);
