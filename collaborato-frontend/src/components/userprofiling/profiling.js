import React, { Component } from 'react';
import './profiling.css';
import Dashboard from './dashboard'
import DashboardNew from './dashboardnew'
// import 'semantic-ui-css/semantic.min.css';
import Navbar from './../navbar/Navbar.jsx';
class Profiling extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <Navbar/>
          <Dashboard/>
          <DashboardNew/>
        </div>
    );
  }
}

export default Profiling;
