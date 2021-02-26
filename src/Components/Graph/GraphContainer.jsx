import React, { Component } from 'react';
import Graph from './Graph';
import moment from 'moment';

class GraphContainer extends Component {
    state = { 
        dataPass: []
    }

    
    async componentDidMount() {
        const response = await fetch('https://api.opencovid.ca/timeseries?stat=cases&loc=canada&after=01-03-2020&before=05-02-2021');
        const data = await response.json(); // maybe you need this, you have to check your response
        this.setState({dataPass: data.cases});
        console.log(data.cases);
        
      }

    render() { 
        if (this.state.dataPass.length>0)
            return (<Graph data={this.mapDataPoints(this.state.dataPass)} labels={this.mapLabels(this.state.dataPass)}/>);
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
                        x: i.date_report,
                        y: i.deaths
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