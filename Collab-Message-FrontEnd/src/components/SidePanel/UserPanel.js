import React from "react";
import firebase from "../../firebase";
import { Grid, Header, Icon, Dropdown, Image } from "semantic-ui-react";
import {Redirect} from 'react-router-dom';
import { Link } from "react-router-dom";
import { stat } from "fs";
class UserPanel extends React.Component {
  state = {
    user: this.props.currentUser,
    RedirecttoLogin:false
  };

  componentDidMount()
  {
    this.setState({RedirecttoLogin:false})
  }
/*[{"userid":"srinivas","emailid":"srinivas@gmail.com","avatar":"gravatar.com/srinivas","firstname":"Mudambi","lastname":"Srinivas","password":"Srinivas"}] */
  dropdownOptions = (user) => [
    {
      key: "user",
      text: (
        <span>
          Signed in as <strong>{}</strong>
        </span>
      ),
      disabled: true
    },
    {
      key: "signout",
      text: <span onClick={this.handleSignout}>Sign Out</span>
    }
  ];

  handleSignout = () => {
 /*   firebase
      .auth()
      .signOut()
      .then(() => console.log("signed out!"));*/
      localStorage.clear();
      this.setState({RedirecttoLogin:true})
  };

  render() {
    const { user } = this.state;
    console.log("USER = " + JSON.stringify(user))
    let redirect = null
    if(this.state.RedirecttoLogin == true)
      redirect = <Redirect to="/login"/>
    else
      redirect = <Redirect to="/collab"/>
    
    return (
      <Grid style={{ background: "#0B5394" }}>
        <Grid.Column>
          <Grid.Row style={{ padding: "1.2em", margin: 0 }}>
            {/* App Header */}
            <Header inverted floated="left" as="h2">
              <Header.Content>
                <a href="http://localhost:3000/feed"
            className="link">Collaborato</a>
                </Header.Content>
            </Header>
            {redirect}
            {/* User Dropdown  */}
            <Header style={{ padding: "0.25em" }} as="h4" inverted>
              <Dropdown
                trigger={
                  <span>
                    <Image src="https://www.gravatar.com/avatar/94d093eda664addd6e450d7e98" spaced="right" avatar />
                 {window.localStorage.getItem('username')}
                  </span>
                }
                options={this.dropdownOptions(this.props.currentUser)}
              />
            </Header>
          </Grid.Row>
        </Grid.Column>
      </Grid>
    );
  }
}

export default UserPanel;
