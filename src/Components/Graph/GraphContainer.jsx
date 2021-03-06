import React, { Component } from 'react';
import Graph from './Graph';
import moment from 'moment';

let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();


class GraphContainer extends Component {
    state = { 
        cases:[],
        deaths:[],
        recovered:[],
    }

    
    async componentDidMount() {
        //const response = await fetch('https://api.opencovid.ca/timeseries?stat=cases&loc=canada&after=01-03-2020&before=05-02-2021');
        //const data = await response.json(); // maybe you need this, you have to check your response
        //this.setState({dataPass: data.cases});
        //console.log(data.cases);
        
        Promise.all([
            await fetch('https://api.opencovid.ca/timeseries?stat=cases&loc='+  this.props.prov +'&after=01-03-2020&before=${date}'),
            await fetch('https://api.opencovid.ca/timeseries?stat=mortality&loc='+ this.props.prov +'&after=01-03-2020&before=${date}'),
            await fetch ('https://api.opencovid.ca/timeseries?stat=recovered&loc='+ this.props.prov +'&after=01-03-2020&before=${date}')
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => {
            // Log the data to the console
            // You would do something with both sets of data here
            console.log(data);
            this.setState({cases: data[0].cases, deaths: data[1].mortality, recovered: data[2].recovered});
            
            //this.setState({deaths: data.mortality})
            
        }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
        });
      }

    render() {
        var datasets = {
            cases: this.mapDataPoints(this.state.cases), 
            deaths: this.mapDataPointsDeaths(this.state.deaths),
            recovered: this.mapDataPointsRecovered(this.state.recovered)
        }
        if (this.state.cases.length>0)
            return (<Graph data={datasets} labels={this.mapLabels(this.state.cases)}/>);
        return null;
    }


    mapDataPoints(value){
        if (value.length>0){
            var map = value.map(function(i){
                return  {
                        x: i.date_report,
                        y: i.cases
                    };
            });
        }
        console.log(map);
        return map;
    }
    
    mapDataPointsDeaths(value){
        if (value.length>0){
            var map = value.map(function(i){
                return  {
                        x: i.date_death_report,
                        y: i.deaths
                    };
            });
        }
        console.log(map);
        return map;
    }

    mapDataPointsRecovered(value){
        if (value.length>0){
            var map = value.map(function(i){
                return  {
                        x: i.date_recovered,
                        y: i.recovered
                    };
            });
        }
        console.log(map);
        return map;
    }

    mapLabels(value){
        if (value.length>0){
            var map = value.map(function(i){
                return i.date_report;
            });
        }
        console.log(map);
        return map;
    }
}
 
export default GraphContainer;