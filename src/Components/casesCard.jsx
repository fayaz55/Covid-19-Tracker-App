import React, { Component,useState } from 'react';

let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
console.log(date);

let codes= {
    'Alberta': 'AB',
    'British Columbia':'BC',
    'Manitoba': 'MB', 
    'New Brunswick': 'NB', 
    'Newfoundland and Labrador': 'NF',
    'Nova Scotia': 'NS',
    'Nunavut': 'NU',
    'Northwest Territories': 'NT',
    'Ontario': 'ON',
    'Prince Edward Island': 'PE',
    'Québec': 'QC',
    'Saskatchewan': 'SK',
    'Yukon':'YT',
    'canada':'canada'
};


class Card extends Component {
    
    state={};
    
    
    componentDidMount(){
        fetch('https://api.opencovid.ca/summary?loc=' + codes[this.props.prov] + '&date=${date}')
            .then(response => response.json())
            .then(data => {
                this.setState(data.summary[0]);
                console.log(data.summary[0]);
            });
     }
     
     
    render() { 

        const {active_cases, active_cases_change,cumulative_deaths,deaths,cumulative_recovered,recovered} = this.state;

        return ( 
            <div className="d-flex justify-content-center" >
                <span className="btn-main cases "> Active Cases <br/> {this.numFormat(active_cases)} <br/> ({this.posVal()}{active_cases_change})</span>
                <span className="btn-main deaths "> Deaths <br/> {this.numFormat(cumulative_deaths)} <br/> (+{deaths}) </span>
                <span className="btn-main recover"> Recovered <br/> {this.numFormat(cumulative_recovered)} <br/> (+{recovered})</span>
            </div>
        );
    }

    numFormat(value){
        return (value+"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }

    posVal(){
        return (this.state.active_cases_change<0?"":"+");
    }
}
 
export default Card;