import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Segment, Accordion, Header, Image, Button,Input } from "semantic-ui-react";
import { Menu, Icon } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
class DashboardLeftBottom extends Component {
  constructor (props) {
  super(props)
  this.state ={
}
  }
  componentDidMount()
  {

  }
render() {
  return (
    <div className="toLeftBottom">
      <Segment className="friends">
        <Header as="h3" attached="right">
        </Header>
        <Menu.Menu className="menu textSize">
        </Menu.Menu>
      </Segment>
      </div>
  );
}
}

export default DashboardLeftBottom;
