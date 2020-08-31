import React, { Component } from 'react';
import './profiling.css';
import DashboardTop from './dashboardtop'
import DashboardNewTop from './dashboardnewtop'
// import 'semantic-ui-css/semantic.min.css';
import Navbar from './../navbar/Navbar.jsx';
class TopTrending extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <Navbar/>
          <DashboardTop/>
          <DashboardNewTop/>
        </div>
    );
  }
}

export default TopTrending;
