import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Segment, Accordion, Header, Image, Button,Input } from "semantic-ui-react";
import { Menu, Icon } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
import DoughnutChart from '../graphs/doughnutchart'
import BarChartNew from '../graphs/barchart-new'
import LineChart from '../graphs/linechart'
import PieChart from '../graphs/piechart'

class DashboardNew extends Component {
    constructor(props) {
      super(props);

      this.state = {
        data: this.getData()
      };
    }

    componentDidMount() {
      window.setInterval(() => {

        this.setState({data:this.getData()})
      //  console.log("DATA STATE : ", this.state.data)
      }, 10000)
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


    generateLineGraph(dataNew) {
      // Create random array of objects
     // const mapNew = new Map([...dataNew.entries()].sort((a, b) => b[1] - a[1]));
     console.log("GENERTATE FUNC LIST = ", dataNew)
      let data = [];
      let counter = 0;

      for (const [ key, value ] of Object.entries(dataNew)) {
        // do something with `key` and `value`
        console.log(key);
        data.push({
          label: key,
          value: value
        });
        }

        var sorted = data.sort(function(a, b) {
          return (a.value > b.value) ? 1 : ((b.value > a.value) ? -1 : 0)
        });
    
      return sorted.slice(Math.max(sorted.length - 5, 0))
    }

    generateBarGraph(prefDict, ideaDict) {
      // Create random array of objects
     // const mapNew = new Map([...dataNew.entries()].sort((a, b) => b[1] - a[1]));
     console.log("GENERTATE FUNC LIST  PREDICT= ", prefDict)
      let data = [];
      let counter = 0;

      for (const [ key, value ] of Object.entries(prefDict)) {
        // do something with `key` and `value`
        data.push({
          label: key,
          value: value
        });
        }
        console.log("INSIDE DATA", data)
        var sorted = data.sort(function(a, b) {
          return (b.value > a.value) ? 1 : ((a.value > b.value) ? -1 : 0)
        });
        console.log("HERE",sorted.length)

        var finalArr = sorted

        sorted.slice(Math.max(sorted.length - 5, 0))
        console.log("HERE",sorted.length)
        let finalData = []
        for(var i=0;i<sorted.length;i++)
        {
          finalData.push({
            label : sorted[i].label,
            value: ideaDict[sorted[i].label]
          }) 
        }

        console.log("FINAL LIST = ", finalData)
      return finalData;
    }



     getData = () => {
              
      var myHeaders = new Headers();
      //myHeaders.append("Cookie", "connect.sid=s%3Adpcu2ngZX9tfc9EW5RzcJHw-hFyVNmVR.Z6TY4x9TVQeSUooUwFsmLQIo5n2cy7op35zTPTHF3W0");
      
      var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
      };

    //  var Ideas = new Set();
      let data = [];
      var dict = {};
      var PrefDict = {};
      var IdeaDict = {};
      var finalList;
      fetch("http://localhost:9000/api/favorites", requestOptions)
        .then(response => response.json())
        .then(result =>  {

        for(var i=0;i<result.length;i++)
        {
          for(var j=0;j<result[i].favorites.length;j++){
            if(result[i].favorites[j].idea_field != undefined && result[i].favorites[j].idea_headline in PrefDict)
              {
                var currCount = PrefDict[result[i].favorites[j].idea_headline]
                currCount=currCount+1
                PrefDict[result[i].favorites[j].idea_headline] = currCount
                IdeaDict[result[i].favorites[j].idea_headline] = result[i].favorites[j].idea_field
              }
              else{
                if(result[i].favorites[j].idea_field != undefined ){
                  PrefDict[result[i].favorites[j].idea_headline] = 1
                IdeaDict[result[i].favorites[j].idea_headline] = result[i].favorites[j].idea_field
                }
              }
          }
        }

        fetch("http://localhost:8102/api/getallactivity", requestOptions)
        .then(response => response.json())
        .then(result =>  {
        for(var i=0;i<result.length;i++)
        {
              dict[result[i].idea_headline] = result[i].visitCount
        }      
        
        data.push({
          title: 'Top 5 Favorited Ideas per Preference',
          data: this.generateBarGraph(PrefDict,IdeaDict)
        });

      data.push({
        title: 'Top 5 Clicked Ideas',
        data: this.generateLineGraph(dict)
      });
      
      console.log("DATA TO BE PLOTTED", data)
     this.setState({data:data})
    })
  })
    .catch(error => console.log('error', error));

      return data;
    }

render() {
console.log("STATE = ", this.state.data)
var Graph = null
var PrefGraph = null
if(this.state.data[1]!=undefined)
{
 Graph = <LineChart
          data={this.state.data[1].data}
          title={this.state.data[1].title}
          color="#007EC2"
        />
}

if(this.state.data[0]!=undefined)
{
  PrefGraph = <BarChartNew
          data={this.state.data[0].data}
          title={this.state.data[0].title}
          colors={['#52d726', '#ffec00', '#ff7300', '#ff0000', '#007ed6', '#7cdddd']}
        />
}
  return (
    <div className="toRight">
      <Segment className="friends">
       {Graph}
      </Segment>
      <Segment className="friends">
       {PrefGraph}
      </Segment>
      </div>
  );
}
}

export default DashboardNew;
