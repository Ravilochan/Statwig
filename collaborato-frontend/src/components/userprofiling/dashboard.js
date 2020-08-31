import React, { Component } from 'react';
import {Route} from 'react-router-dom'
import { Segment, Accordion, Header, Image, Button,Input } from "semantic-ui-react";
import { Menu, Icon } from "semantic-ui-react";
// import 'semantic-ui-css/semantic.min.css';
import LineChart from '../graphs/linechart'
import BarChart from '../graphs/barchart'
import DoughnutChart from "../graphs/doughnutchart"

class Dashboard extends Component {
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


      generateBarGraph(dataNew) {
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
            return (b.value > a.value) ? 1 : ((a.value > b.value) ? -1 : 0)
          });
      
     //   for (let key of dataNew.entries()) {



        // for (var val= 0; val<dataNew.length;val++) {
         
          
        // }
        return sorted.slice(Math.max(sorted.length - 5, 0))
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
        var finalList;
        fetch("http://localhost:9000/api/favorites", requestOptions)
          .then(response => response.json())
          .then(result =>  {

          for(var i=0;i<result.length;i++)
          {
            for(var j=0;j<result[i].favorites.length;j++){
             // console.log("IDEA = ", result[i].favorites[j])

              if(result[i].favorites[j].idea_field != undefined && result[i].favorites[j].idea_field in PrefDict)
              {
                console.log("is already prensent:" , result[i].favorites[j].idea_field)
                var currCount = PrefDict[result[i].favorites[j].idea_field]
                currCount=currCount+1
                PrefDict[result[i].favorites[j].idea_field] = currCount
              }
              else{
                if(result[i].favorites[j].idea_field != undefined && !(result[i].favorites[j].idea_field in PrefDict))
                {
                PrefDict[result[i].favorites[j].idea_field] = 1
                }
              }

              if(result[i].favorites[j].idea_headline != undefined && result[i].favorites[j].idea_headline in dict)
              {
                var currCount = dict[result[i].favorites[j].idea_headline]
                currCount=currCount+1
                dict[result[i].favorites[j].idea_headline] = currCount
              }
              else{
                dict[result[i].favorites[j].idea_headline] = 1
              }
             // console.log("FAV IDEAS" ,result[i].favorites[j])
            }
          }

         //finalList =  Array.from(Ideas);
          //console.log("FINAL LIST = ", finalList)

       
        data.push({
          title: 'Top 5 Favorited Ideas',
          data: this.generateBarGraph(dict)
        });

        data.push({
          title: 'Top 5 Favorited Genres',
          data: this.generateBarGraph(PrefDict)
        });
        
       this.setState({data:data})
      })
      .catch(error => console.log('error', error));

        return data;
      }


render() {
  console.log("STATE = ", this.state.data)
  var Graph = null
  var PrefGraph = null
  if(this.state.data[0]!=undefined)
  {
   Graph = <BarChart
            data={this.state.data[0].data}
            title={this.state.data[0].title}
            color="#007EC2"
          />
  }

  if(this.state.data[1]!=undefined)
  {
    PrefGraph = <DoughnutChart
            data={this.state.data[1].data}
            title={this.state.data[1].title}
            colors={['#52d726', '#ffec00', '#ff7300', '#ff0000', '#007ed6', '#7cdddd']}
          />
  }

   return (
        <div>
        <div class="sidebar">
            <a href="/trends"><h3>Trending on Collaborato</h3></a>
         </div>

    <div class="content">
    <div className="largefriends">
      <Segment className="friends">
        {PrefGraph}
      </Segment>
      <br/>
      {/* <h3>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Preference wise favorites</h3> */}
      <br/>
      <br/>
      <Segment className="friends">
        {Graph}
      </Segment>
      </div>
      </div>
</div>
  );
}
}

export default Dashboard;
