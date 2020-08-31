import React,{ Component } from 'react';
import { MDBCard, MDBCardTitle, MDBBtn, MDBCardGroup, MDBCardImage, MDBCardText, MDBCardBody } from "mdbreact";
import { Route, withRouter, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import {bindActionCreators} from 'redux';
import {ideaComment, ideaVote, ideaDownVote,ideaSelect} from './../../api/Api';
import {history} from "../../util/utils";
import Collapsible from 'react-collapsible';
import * as UTIL from "../../util/utils";

class RecommendationCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      feed : []
    }
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    // this.props.ideaSelect(this.props.recommendation);
  }
  componentWillMount() {
    console.log("CAME HERE");
    this.setState({
      feed : this.props.recommendation
    })
    console.log("type of recommendation card : " +typeof(this.state.feed.comment));
  }

  render() {
    // const imageURL = UTIL.getImageURL(this.state.feed[0].idea_field);
    const imageURL = 'https://mdbootstrap.com/img/Photos/Others/images/77.jpg';
    console.log("recommendation card : " +typeof(this.state.feed));
    return(
      <div>
      	<MDBCardGroup>
      <MDBCard>
        <MDBCardImage src={imageURL} alt="MDBCard image cap" top hover
          overlay="white-slight" />
        <MDBCardBody>
          <MDBCardTitle className = "headline" tag="h1">
                  {this.state.feed[0].idea_headline}
            </MDBCardTitle>
          <br/>
           <MDBCardTitle className = "descriptionDetail" tag="h4">{this.state.feed[0].idea_description}</MDBCardTitle>
           <br/>
          <MDBBtn color="primary" size="md">
            read more
          </MDBBtn>
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
    };
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch",dispatch);
    return bindActionCreators({ideaSelect : ideaSelect}, dispatch);
}
export default connect(null,matchDispatchToProps)(RecommendationCard);
