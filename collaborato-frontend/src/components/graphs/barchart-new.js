
import React, { Component } from 'react';
import Chart from 'chart.js'
class BarChartNew extends React.Component {
    constructor(props) {
      super(props);
      this.canvasRef = React.createRef();
    }
  
    componentDidUpdate() {
      this.myChart.data.labels = this.props.data.map(d => d.label);
      this.myChart.data.datasets[0].data = this.props.data.map(d => d.value);
      this.myChart.update();
    }

     randomColorGenerator =  (len)  =>{
       let color = []
       for(var i=0;i<len;i++) 
        {
          color.push('#' + (Math.random().toString(16) + '0000000').slice(2, 8)); 
        }

        return color;
  };

 
    componentDidMount() {
      console.log("LABELS = ", this.props.data)
      let labels = []
      let values = []
      for(var i=0;i<this.props.data.length;i++)
      {
        labels.push(this.props.data[i].label)
        values.push(this.props.data[i].value)
      }

      this.myChart = new Chart(this.canvasRef.current, {
        type: 'line',
  data: {
    xLabels: labels,
    yLabels: values,
    datasets: [{
      label: "My First dataset",
      data: values,
      fill: false,
      showLine: false,
      borderColor: this.props.colors,
      backgroundColor: this.props.colors
    }]
  },
  options: {
    responsive: true,
    title:{
      display: true,
      text: 'Top Ideas per Preference'
    },
    legend: {
      display: false
    },
    scales: {
      xAxes: [{
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Ideas'
        }
      }],
      yAxes: [{
        type: 'category',
        position: 'left',
        display: true,
        scaleLabel: {
          display: true,
          labelString: 'Preferences'
        },
        ticks: {
          reverse: true
        },
      }]
    }
  }
    })}
  
    render() {
      return (
          <canvas ref={this.canvasRef} />
      );
    }
  }

  
  export default BarChartNew;