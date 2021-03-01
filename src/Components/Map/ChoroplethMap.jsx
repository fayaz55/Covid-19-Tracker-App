import React, { Component } from 'react';
import Datamap from 'datamaps/dist/datamaps.world.min.js';
import d3 from 'd3';
import CanadaJson from './canada.topo.json';

class ChoroplethMap extends Component {
    constructor(props){
        super(props);
        this.numFormat=this.numFormat.bind(this);
    }

    numFormat(value){
        return (value+"").toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
    }
    componentDidMount() {
        
        // Datamaps expect data in format:
        // { "USA": { "fillColor": "#42a844", numberOfWhatever: 75},
        //   "FRA": { "fillColor": "#8dc386", numberOfWhatever: 43 } }
        let dataset = {};

        // We need to colorize every country based on "numberOfWhatever"
        // colors should be uniq for every value.
        // For this purpose we create palette(using min/max this.props.data-value)
        let onlyValues = this.props.data.map(function (obj) { return obj[1]; });
        let minValue = Math.min.apply(null, onlyValues),
            maxValue = Math.max.apply(null, onlyValues);

        // create color palette function
        // color can be whatever you wish
        let paletteScale = d3.scale.linear()
            .domain([minValue, maxValue])
            .range(["#EFEFFF", "#02386F"]); // blue color

        // fill dataset in appropriate format
        this.props.data.forEach(function (item) { //
            // item example value ["USA", 70]
            
            let iso = item[0],
                value = item[1];
            dataset[iso] = { 
                numberOfThings: value, 
                fillColor: paletteScale(value), 
                active_cases: item[2],
                active_cases_change: item[3],
                total_deaths: item[4],
                deaths: item[5],
                total_recovered: item[6],
                recovered:item[7],
                cases: item[8]
            };
        });

    
        let map = new Datamap({
            element: document.getElementById('cloropleth_map'),
            scope: 'canada',
            geographyConfig: {
                popupOnHover: true,
                highlightOnHover: true,
                borderColor: '#444',
                highlightBorderWidth: 1,
                borderWidth: 0.5,
                dataJson: CanadaJson,
                popupTemplate: function (geo, data) {
                    // don't show tooltip if country don't present in dataset
                    if (!data) { return; }

                    // tooltip content
                    return ['<div class="hoverinfo">',
                        '<strong>', geo.properties.name, '</strong>',
                        '<br>Total Cases: <strong>', data.numberOfThings, '</strong>',
                        '<br>Active Cases: <strong>', data.active_cases, '</strong>',
                        '<br>New Cases: <strong>', data.cases, '</strong>',
                        '<br>Deaths: <strong>', data.total_deaths, '</strong>',
                        '</div>'].join('');
                }
            },
            fills: {
                HIGH: '#afafaf',
                LOW: '#123456',
                MEDIUM: 'blue',
                UNKNOWN: 'rgb(0,0,0)',
                defaultFill: '#eee'
            },
            data: dataset,
            setProjection: function (element) {
                var projection = d3.geo.mercator()
                    .center([-106.3468, 68.1304]) // always in [East Latitude, North Longitude]
                    .scale(500)
                    .translate([element.offsetWidth / 2.2, element.offsetHeight / 10]); // Offset Height(crop from top)

                var path = d3.geo.path().projection(projection);
                return { path: path, projection: projection };
            }, 
            done: function(datamap) {
                datamap.svg.selectAll('.datamaps-subunit').on('click', function(geography) {
                    window.location.href = '/province/' + geography.properties.name
                    //alert (geography.properties.name)
                });
            }
        });
    }
    render() {
        return (
            
            <div id="cloropleth_map" className="map"></div>
            
        );
    }
    
    

    
}

export default ChoroplethMap;