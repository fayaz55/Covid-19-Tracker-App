import React, { Component,useState } from 'react';

let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();


class casesCard extends Component {
    
    state={};
    
    
    componentDidMount(){
        fetch('https://api.opencovid.ca/summary?loc=' + this.props.prov + '&date=${date}')
            .then(response => response.json())
            .then(data => {
                this.setState(data.summary[0]);
                console.log(data.summary[0]);
            });
     }
     
     
    render() { 

        const {active_cases, active_cases_change,cumulative_deaths,deaths,cumulative_recovered,recovered,cumulative_testing, testing} = this.state;

        return ( 
            <div className="d-flex justify-content-center" >
                <span className="btn-main cases "> Active Cases <br/> {this.numFormat(active_cases)} <br/> ({this.posVal()}{active_cases_change})</span>
                <span className="btn-main deaths "> Deaths <br/> {this.numFormat(cumulative_deaths)} <br/> (+{deaths}) </span>
                <span className="btn-main recover"> Recovered <br/> {this.numFormat(cumulative_recovered)} <br/> (+{this.numFormat(recovered)})</span>
                <span className="btn-main testing"> Testing <br/> {this.numFormat(cumulative_testing)} <br/> (+{this.numFormat(testing)})</span>
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
 
export default casesCard;