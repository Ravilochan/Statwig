import React,{ Component } from 'react';
import {bindActionCreators} from 'redux';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import * as UTIL from "../../util/utils";
import './feed.css';
import RecommendationCard from './recommendationCard.js'
import IdeaCard from './ideaCard.js'
import Reload from './reload.js'
import {ideaRecommendation} from './../../api/Api';

import { MDBBtn, MDBCard, MDBCardBody, MDBCardImage, MDBCardTitle, MDBCardText, MDBCol,MDBRow,MDBIcon,MDBCardGroup } from 'mdbreact';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';

class Recommendation extends Component {
  constructor() {
    super();
    this.state = {
      showError: false
    }
  }
  componentWillMount() {
    console.log("this.props.recommendation : " +this.props.recommendation);
    this.props.ideaRecommendation(this.props.feed._id);
  }

  render() {
    var random = -1;
    return (
            <div>
            <MDBCardGroup className = "detailContainer">
              <MDBCard className ="innercard">
                <MDBCardBody className = "cardbodyrec">
                    {
                      this.props.recommendation != undefined ?
                      <h3> You might be interested in reading below ideas <br/><br/><br/></h3>: ""
                    }
                    {
                      this.props.recommendation.length != undefined ?
                      this.props.recommendation.map((feed) => {
                        random = (random + 1) % 5;
                        return(<IdeaCard feed={feed} random = {random}/>);
                      })  : ""
                    }
                    {
                      this.props.loading == true ?
                      <Reload/>: ''
                    }
                </MDBCardBody>
              </MDBCard>
              </MDBCardGroup>
            </div>
    );
  }
}

function mapStateToProps(state) {
  console.log("State",state);
    return {
       recommendation : state.FeedReducer.recommendation,
       loading : state.FeedReducer.loading,
       feed : state.FeedReducer.selectedIdea
    };
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaRecommendation : ideaRecommendation}, dispatch);
}
export default connect(mapStateToProps,matchDispatchToProps)(Recommendation);
