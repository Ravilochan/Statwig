import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Segment, Accordion, Header, Image, Button,Input } from "semantic-ui-react";
import { Menu, Icon } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
import LineChart from '../graphs/linechart'
import BarChart from '../graphs/barchart'

class DashboardPreference extends Component {
    constructor(props) {
        super(props);

        this.state = {
          data: this.getData()
        };
      }

      componentDidMount() {
        window.setInterval(() => {
          this.setState({
            data: this.getData()
          })
        }, 5000)
      }

    getRandomArray(numItems) {
        // Create random array of objects
        let names = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let data = [];
        for(var i = 0; i < numItems; i++) {
          data.push({
            label: names[i],
            value: Math.round(20 + 80 * Math.random())
          });
        }
        return data;
      }

       getRandomDateArray(numItems) {
        // Create random array of objects (with date)
        let data = [];
        let baseTime = new Date('2018-05-01T00:00:00').getTime();
        let dayMs = 24 * 60 * 60 * 1000;
        for(var i = 0; i < numItems; i++) {
          data.push({
            time: new Date(baseTime + i * dayMs),
            value: Math.round(20 + 80 * Math.random())
          });
        }
        return data;
      }

       getData() {
        let data = [];

        data.push({
          title: 'Visits',
          data: this.getRandomDateArray(150)
        });

        data.push({
          title: 'Categories',
          data: this.getRandomArray(20)
        });

        data.push({
          title: 'Categories',
          data: this.getRandomArray(10)
        });

        data.push({
          title: 'Data 4',
          data: this.getRandomArray(6)
        });

        return data;
      }
render() {
  return (
        <div>
        <div class="sidebar">
            <a class="active" href="/trends">Collaborato Dashboard</a>
            <a href="/trends/ideas">Idea Trends</a>
            <a href="/trends/preferences">Preferences Trends</a>
            <a href="/trends/toptrends">Top Trends</a>
         </div>

    <div class="content">
    <div className="largefriends">
      <Segment className="friends">r>

        <LineChart
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            color="#3E517A"
          />
      </Segment>
      <Segment className="friends">


        {/* // <BarChart
        //     data={this.state.data[1].data}
        //     title={this.state.data[1].title}
        //     color="#70CAD1"
        //   /> */}
      </Segment>
      </div>
      </div>
</div>
  );
}
}

export default DashboardPreference;
