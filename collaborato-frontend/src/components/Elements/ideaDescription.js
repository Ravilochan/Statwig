import React,{ Component } from 'react';
import {  MDBCardText, MDBCardImage } from 'mdbreact';
import {Link} from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';
import {history} from "../../util/utils";
import LockSharpIcon from '@material-ui/icons/LockSharp';
import {bindActionCreators} from 'redux';
import {ideaSelect} from './../../api/Api';
import { connect } from "react-redux";

class IdeaDescription extends Component {
  constructor() {
    super();
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    this.props.ideaSelect(this.props.feed);
  }

  render() {
    return(
      <div>
          <MDBCardText className = "para-description">
              {
                this.props.feed.idea_type == 'Not-On-Sale' || this.props.feed.idea_type == 'LOCKED_IDEA'?
                  <div className= "lockedclass">
                    <svg className= "lockedsvg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M18 10v-4c0-3.313-2.687-6-6-6s-6 2.687-6 6v4h-3v14h18v-14h-3zm-5 7.723v2.277h-2v-2.277c-.595-.347-1-.984-1-1.723 0-1.104.896-2 2-2s2 .896 2 2c0 .738-.404 1.376-1 1.723zm-5-7.723v-4c0-2.206 1.794-4 4-4 2.205 0 4 1.794 4 4v4h-8z"/></svg>&nbsp;&nbsp;&nbsp;Locked Idea </div>
                :this.props.feed.idea_description.length > 350 ? <h4 className = "rec-col">{this.props.feed.idea_description.substring(0, 350)} <Link to="/detail"
                  onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
                  ><h5> ...continue reading</h5></Link></h4> : <h4 className = "rec-col">{this.props.feed.idea_description}</h4>
              }
          </MDBCardText>
      </div>
      );
  }
}

function matchDispatchToProps(dispatch){
    console.log("Dispatch of details page",dispatch);
    return bindActionCreators({ ideaSelect : ideaSelect}, dispatch);
}
export default connect(null,matchDispatchToProps)(IdeaDescription);
