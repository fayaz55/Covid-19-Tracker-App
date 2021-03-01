import React, { Component } from 'react';
import VaccineGraph from './VaccineGraph';
import moment from 'moment';

let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();


class VaccineGraphContainer extends Component {
    state = { 
        distributed:[],
        administered:[],
        completed:[],
    }

    
    async componentDidMount() {
        //const response = await fetch('https://api.opencovid.ca/timeseries?stat=cases&loc=canada&after=01-03-2020&before=05-02-2021');
        //const data = await response.json(); // maybe you need this, you have to check your response
        //this.setState({dataPass: data.cases});
        //console.log(data.cases);
        
        Promise.all([
            await fetch('https://api.opencovid.ca/timeseries?stat=dvaccine&loc='+ this.props.prov +'&after=01-12-2020&before=${date}'),
            await fetch('https://api.opencovid.ca/timeseries?stat=avaccine&loc='+ this.props.prov +'&after=01-12-2020&before=${date}'),
            await fetch('https://api.opencovid.ca/timeseries?stat=cvaccine&loc='+ this.props.prov +'&after=01-12-2020&before=${date}')
        ]).then(function (responses) {
            // Get a JSON object from each of the responses
            return Promise.all(responses.map(function (response) {
                return response.json();
            }));
        }).then(data => {
            // Log the data to the console
            console.log(data);
            this.setState({distributed: data[0].dvaccine, administered: data[1].avaccine, completed: data[2].cvaccine});
            
        }).catch(function (error) {
            // if there's an error, log it
            console.log(error);
        });
      }

    render() {

        var datasets = {
            distributed: this.mapDataPoints(this.state.distributed), 
            administered: this.mapDataPointsAvaccine(this.state.administered),
            completed: this.mapDataPointsCvaccine(this.state.completed)
        }
        if (this.state.distributed.length>0)
            return (<VaccineGraph data={datasets} labels={this.mapLabels(this.state.distributed)}/>);
        return null;
    }


    mapDataPoints(value){
        if (value.length>0){
            var map = value.map(function(i){
                return  {
                        x: i.date_vaccine_distributed,
                        y: i.dvaccine
                    };
            });
        }
        console.log(map);
        return map;
    }
    
    mapDataPointsAvaccine(value){
        if (value.length>0){
            var map = value.map(function(i){
                return  {
                        x: i.date_vaccine_administered,
                        y: i.avaccine
                    };
            });
        }
        console.log(map);
        return map;
    }

    mapDataPointsCvaccine(value){
        if (value.length>0){
            var map = value.map(function(i){
                return  {
                        x: i.date_vaccine_completed,
                        y: i.cvaccine
                    };
            });
        }
        console.log(map);
        return map;
    }

    mapLabels(value){
        if (value.length>0){
            var map = value.map(function(i){
                return i.date_vaccine_distributed;
            });
        }
        console.log(map);
        return map;
    }
}
 
export default VaccineGraphContainer;