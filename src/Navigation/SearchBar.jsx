import Select from 'react-select';
import React, { Component } from 'react';
import './Navigation.css'

const options = [
    { value: 'british columbia', label: 'British Columbia' },
    { value: 'alberta', label: 'Alberta' },
    { value: 'saskatchewan', label: 'Saskatchewan' },
    { value: 'manitoba', label: 'Manitoba' },
    { value: 'ontario', label: 'Ontario' },
    { value: 'quebec', label: 'Québec' },
    { value: 'new brunswick', label: 'New Brunswick' },
    { value: 'nova scotia', label: 'Nova Scotia' },
    { value: 'prince edward island', label: 'Prince Edward Island' },
    { value: 'newfoundland and labrador', label: 'Newfoundland and Labrador' },
    { value: 'yukon', label: 'Yukon' },
    { value: 'northwest territories', label: 'Northwest Territories' },
    { value: 'nunavut', label: 'Nunavut' },

  ];


class SearchBar extends Component{
state = {
    selectedOption: null,
}
handleChange = selectedOption => {
    this.setState({ selectedOption })
    window.location.href = '/province/' + selectedOption.label;
    // code to make something happen after selecting an option
}
render(){
    return (
    <div className='search'>
    <Select
        value={this.selectedOption}
        options={options}
        onChange={this.handleChange}
        placeholder= "Enter Provice/Territory..."
        openMenuOnClick={false}
        autosize={true}  
        theme={'neutral190'}
    />
    </div>
    );
}
}

   export default SearchBar;