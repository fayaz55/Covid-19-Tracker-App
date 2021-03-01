
import React, { Component} from 'react';
import Card from '../../Components/casesCard';
import VaccineCard from '../../Components/vaccineCard';
import GraphContainer from '../../Components/Graph/GraphContainer';
import ChoroplethMap from '../../Components/Map/ChoroplethMap';
import './MainPage.css'
import VaccineGraphContainer from '../../Components/Graph/VaccineGraphContainer';

let today = new Date();
let date=today.getDate() + "-"+ parseInt(today.getMonth()+1) +"-"+today.getFullYear();


class MainPage extends Component {
  
  constructor(props) {
    super(props);
    this.state = { array: []};
  }

  componentDidMount(){
    fetch('https://api.opencovid.ca/summary?date=${date}')
      .then(response => response.json())
      .then(data => {
          this.setState({array: data.summary});
          console.log(data.summary);
      });
  }

  render(){
    if (this.state.array.length>0){
      return (
        <div className="App"> 
          
          <h1 className="heading-main"> Covid-19 Tracker</h1>
          
          <Card prov={'canada'}/>
          <div className="d-flex justify-content-center">
            <h4 className="note">*Last Updated: {date}</h4>
          </div>
          
          <h2 className="heading-second"> Number Across Canada</h2>
          <div className="d-flex justify-content-center">
            <ChoroplethMap data={this.mapdata(this.state.array)}/>
          </div>
          <div className="d-flex justify-content-center">
            <h4 className="note">Click on Province/Territory for more info</h4>
          </div>

          <h2 className="heading-second"> Trends Over Time</h2>
          <div className="d-flex justify-content-center">
            <h4 className="note-bar">Click on the legend labels to show/hide dataset</h4>
          </div>
          <div className="d-flex justify-content-center graph">
            <GraphContainer prov={'canada'}/>
          </div>
          
          
          <h2 className="heading-second"> Vaccine Progress</h2>
          <VaccineCard prov={'canada'}/>
          <h2 className="heading-second"> Vaccine Distribution</h2>
          <div className="d-flex justify-content-center">
            <h4 className="note-bar">Click on the legend labels to show/hide dataset</h4>
          </div>
          <div className="d-flex justify-content-center graph">
            <VaccineGraphContainer prov={'canada'}/>
          </div>

        </div>
      );
    }

    return null;
    /*(
      <div className="App"> 
        <h1 className="heading-main"> Covid-19 Tracker</h1>
        <Card prov={'canada'} />
        <h2 className="heading-second"> Number Across Canada</h2>
      </div>
    )*/
  }
  
  mapdata(value){
    let pt=['AB','BC','MB','NB','NF','NS','NU','NT','ON','PE','QC','RE','SK','YT'];
    let array1=value;
    if (array1.length>0){
      var map = pt.map(function(val,i){
        return [
                val, 
                array1[i].cumulative_cases,
                array1[i].active_cases,
                array1[i].active_cases_change,
                array1[i].cumulative_deaths,
                array1[i].deaths, 
                array1[i].cumulative_recovered,
                array1[i].recovered,
                array1[i].cases
              ];
      });
    }
    console.log(map);
    return map;
  }

}

export default MainPage;