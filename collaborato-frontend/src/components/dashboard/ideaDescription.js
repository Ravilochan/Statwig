import React,{ Component } from 'react';
import {  MDBCardText, MDBCardImage } from 'mdbreact';
import {Link} from 'react-router-dom';
import LockIcon from '@material-ui/icons/Lock';
import HttpsRoundedIcon from '@material-ui/icons/HttpsRounded';
import {history} from "../../util/utils";
import LockSharpIcon from '@material-ui/icons/LockSharp';

class IdeaDescription extends Component {
  constructor() {
    super();
    this.handleIdeaClick = this.handleIdeaClick.bind(this);
  }
  handleIdeaClick = (ID ,e) => {
    e.preventDefault();
    history.push({
      pathname: '/detail',
      state: { detail: this.props.feed}
    })
  }

  render() {
    return(
      <div>
          <MDBCardText className = "para-description">
              {
                this.props.feed.idea_description.length > 350 ? <h4>{this.props.feed.idea_description.substring(0, 350)} <Link to="/detail"
                  onClick = {this.handleIdeaClick.bind(this, this.props.feed._id)}
                  ><h5> ...continue reading</h5></Link></h4> : this.props.feed.idea_description
              }
          </MDBCardText>
      </div>
      );
  }
}

export default (IdeaDescription);
