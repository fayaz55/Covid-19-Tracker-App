import React, { Component } from 'react';
import {Line, Scatter} from 'react-chartjs-2';
class Graph extends Component {
    constructor(props){
        super(props)
    }
    state = {
        //data: this.props.data,
        labels: this.props.labels,
        datasets: [
            {
                label: "New Cases Per Day",
                data: this.props.data,//[33, 53, 85, 41, 44, 65],
                fill: true,
                showLine: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            },
            /*
            {
                label: "Deaths",
                data: this.props.data,//[33, 25, 35, 51, 54, 76],
                fill: false,
                borderColor: "#742774"
            }*/
        ],
        options: {
            padding:"5px",
            responsive: true,
            maintainAspectRatio:false,
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    time: { parser: 'DD-MM-YYYY' },
                  }],    
            },
            elements: {
                point:{
                    radius: 0
                }
            }
        }  
      }
    
    render() {
        return (  
            <div className="chart">
                <Line ref={ref => this.chartRefernece = ref} data= {this.state} height={500} width={1000} />
            </div>
        );
    }
}
 
export default Graph;