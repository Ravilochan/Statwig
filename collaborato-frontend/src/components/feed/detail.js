import React,{ Component } from 'react';
import { Route, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaSelect} from './../../api/Api';
import Navbar from './../navbar/Navbar.jsx';
import DetailCard from './detailCard.js'
import Reload from './reload.js'
import { BoxLoading } from 'react-loadingg';
import Collapsible from 'react-collapsible';
import PopularPost from './popularPost.js';
import Recommendation from './recommendation.js'
import LoginNavbar from './../navbar/loginNavbar.jsx';
class Detail extends Component {
  render() {
    return(
      <div>
      {
        localStorage.getItem('JWT-TOKEN') == null ? <LoginNavbar/> : <Navbar/>
      }
      {
        localStorage.getItem('JWT-TOKEN') == null ? '':
        <div>
          <div className = "centralDiv">
              <DetailCard/>
              <br/>
              <Recommendation/>
          </div>
          <div className = "rightDiv">
            <PopularPost/>
          </div>
        </div>
      }

      </div>
    );
  }
}


  function mapStateToProps(state) {
    console.log("State",state);
      return {
         selectedIdea: state.FeedReducer.selectedIdea
      };
  }
export default connect(mapStateToProps,null)(Detail);
