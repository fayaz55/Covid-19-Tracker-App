import React, { Component,useState } from 'react';

let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();




class VaccineCard extends Component {
    
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

        const {cumulative_dvaccine, dvaccine, cumulative_avaccine,avaccine,cumulative_cvaccine,cvaccine} = this.state;

        return ( 
            <div className="d-flex justify-content-center" >
                <span className="btn-main cases "> Distributed <br/> {this.numFormat(cumulative_dvaccine)} <br/> (+{this.numFormat(dvaccine)})</span>
                <span className="btn-main deaths "> Administered <br/> {this.numFormat(cumulative_avaccine)} <br/> (+{this.numFormat(avaccine)}) </span>
                <span className="btn-main recover"> Completed <br/> {this.numFormat(cumulative_cvaccine)} <br/> (+{this.numFormat(cvaccine)})</span>
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
 
export default VaccineCard ;