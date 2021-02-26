import React, { Component } from 'react';
import './Province.css'
import Card from '../../Components/casesCard'

let today = new Date();
let date=today.getDate()-1 + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();
console.log(date);
let codes= {
    'Alberta': 'AB',
    'British Colombia':'BC',
    'Manitoba': 'MB', 
    'New Brunswick': 'NB', 
    'Newfoundland and Labrador': 'NF',
    'Nova Scotia': 'NS',
    'Nunavut': 'NU',
    'Northwest Territories': 'NT',
    'Ontario': 'ON',
    'Prince Edward Island': 'PE',
    'Quebec': 'QC',
    'Saskatchewan': 'SK',
    'Yukon':'YT'
};

class Province extends Component {
    
    render() { 

        return ( 
            <div>
                <h1  className="header1"> Province of {this.props.match.params.id}. </h1>
                <Card prov={this.props.match.params.id}/>
            </div>
            
         );
    }
}

export default Province;