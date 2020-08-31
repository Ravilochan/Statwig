import React, { Component } from 'react';
import './profiling.css';
import DashboardPreference from './dashboardpreference'
import DashboardNewPreference from './dashboardnewpreference'
// import 'semantic-ui-css/semantic.min.css';
import Navbar from './../navbar/Navbar.jsx';
class PreferenceTrends extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
        <div>
          <Navbar/>
          <DashboardPreference/>
          <DashboardNewPreference/>
        </div>
    );
  }
}

export default PreferenceTrends;
