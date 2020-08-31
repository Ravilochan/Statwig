import React, { Component } from 'react';
import Chart from 'chart.js'
class PieChart extends React.Component {
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
      this.myChart = new Chart(this.canvasRef.current, {
        type: 'pie',
        options: {
          maintainAspectRatio: false,
        },
      data: {
        labels: this.props.data.map(d => d.label),
        datasets: [{
          label: this.props.title,
          fillColor: this.randomColorGenerator(), 
          strokeColor: this.randomColorGenerator(), 
          highlightFill: this.randomColorGenerator(),
          highlightStroke: this.randomColorGenerator(),
          data: this.props.data.map(d => d.value),
          backgroundColor: this.props.colors
        }]
      }
    });
  
    }
  
  
    render() {
      return <canvas ref={this.canvasRef} />;
    }
  }

  export default PieChart;