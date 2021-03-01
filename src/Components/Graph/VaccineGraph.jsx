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
                label: "Distributed",
                data: this.props.data.distributed,
                fill: true,
                showLine: true,
                backgroundColor: "rgba(255, 255, 179,0.2)",
                borderColor: "rgb(255, 255, 128)",
                pointHoverRadius: "0"
            },
            
            {
                label: "Administered",
                data: this.props.data.administered,
                fill: true,
                backgroundColor: "rgba(255, 153, 194,0.2",
                borderColor: "#ff99c2"
            },

            {
                label: "Completed",
                data: this.props.data.completed,
                fill: true,
                backgroundColor: "rgba(75,192,192,0.2)",
                borderColor: "rgba(75,192,192,1)"
            }

        ],
        options: {
            legend: {
                position: 'left',
                fullWidth: false
            },
            
            padding:"5px",
            responsive: true,
            maintainAspectRatio:true,
            scales: {
                xAxes: [{
                    type: 'time',
                    display: true,
                    time: { parser: 'DD-MM-YYYY'},
                    ticks: {
                        display:true,
                        fontColor: "white",
                        fontSize: 20,
                        stepSize: 15,
                    }
                  }],
                yAxes: [{
                    ticks: {
                        fontColor: "white",
                        fontSize: 15,
                    },
                }]    
            },
            elements: {
                point:{
                    radius: 0
                }
            }
        }, 
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