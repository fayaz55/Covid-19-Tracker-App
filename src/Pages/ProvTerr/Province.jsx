import React, { Component } from 'react';
import './Province.css'
import Card from '../../Components/casesCard'
import GraphContainer from '../../Components/Graph/GraphContainer';
import VaccineCard from '../../Components/vaccineCard';
import VaccineGraphContainer from '../../Components/Graph/VaccineGraphContainer';


let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();

let codes= {
    'Alberta': 'AB',
    'British Columbia':'BC',
    'Manitoba': 'MB', 
    'New Brunswick': 'NB', 
    'Newfoundland and Labrador': 'NL',
    'Nova Scotia': 'NS',
    'Nunavut': 'NU',
    'Northwest Territories': 'NT',
    'Ontario': 'ON',
    'Prince Edward Island': 'PE',
    'Québec': 'QC',
    'Saskatchewan': 'SK',
    'Yukon':'YT'
};

class Province extends Component {
    
    render() { 
        const {id} =this.props.match.params;
        console.log(id);
        return ( 
            <div>
                <h1  className="heading-main"> {this.provinceTerritory(id)} </h1>
                <Card prov={codes[id]}/>
                <div className="d-flex justify-content-center">
                    <h4 className="note">*Last Updated: {date}</h4>
                </div>
                <h2 className="heading-second"> Trends Over Time</h2>
                <div className="d-flex justify-content-center">
                    <h4 className="note-bar">Click on the legend labels to show/hide dataset</h4>
                </div>
                <div className="d-flex justify-content-center graph">
                    <GraphContainer prov={codes[id]}/>
                </div>
                <h2 className="heading-second"> Vaccine Progress</h2>
                <VaccineCard prov={codes[id]}/>
                <h2 className="heading-second"> Vaccine Distribution</h2>
                <div className="d-flex justify-content-center">
                    <h4 className="note-bar">Click on the legend labels to show/hide dataset</h4>
                </div>
                <div className="d-flex justify-content-center graph">
                    <VaccineGraphContainer prov={codes[id]}/>
                </div>
            </div>
            
         );
    }

    provinceTerritory(val){

        if (val==='Yukon' || val==='Nunavut')
            return val+ " Territory";
        else if (val==='Northwest Territories')
            return val;
        else
            return 'Province of ' + val;

    }
    
}

export default Province;