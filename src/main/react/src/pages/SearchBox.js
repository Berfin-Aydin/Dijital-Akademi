import React from "react";
import "./SearchBox.css"
import { Button } from "@material-ui/core";
import "primeicons/primeicons.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.css";
import "primeflex/primeflex.css";
import { Dropdown } from "primereact/dropdown";
import {searchNote} from "../api/apiCalls";
export default class SearchBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCountry: null,
      selectedCountry1: null
    };

    this.countries = [
      {name: 'MATEMATIK', code: 'MATEMATIK'},
      {name: 'KIMYA', code: 'KIMYA'},
      {name: 'GEOMETRI', code: 'GEOMETRI'},
      {name: 'BIYOLOJI', code: 'BIYOLOJI'},
      {name: 'BILGISAYAR', code: 'BILGISAYAR'},
      {name: 'TARIH', code: 'TARIH'},
      {name: 'TURKCE', code: 'TURKCE'},
      {name: 'EDEBIYAT', code: 'EDEBIYAT'}
    ];

    this.onCountryChange = this.onCountryChange.bind(this);
  }

  onCountryChange(e) {
    searchNote(e.value.code).then(response=>{
      this.setState({
        selectedCountry: e.value,
        selectedCountry1:response.data
      });
    })



  }

  selectedCountryTemplate(option, props) {
    if (option) {
      return (
          <div className="country-item country-item-value">

            <div>{option.name}</div>
          </div>
      );
    }

    return <span>{props.placeholder}</span>;
  }

  countryOptionTemplate(option) {
    return (
        <div className="country-item">

          <div>{option.name}</div>
        </div>
    );
  }

  render() {
    return (
        <div className="card">
          <Dropdown
              value={this.state.selectedCountry}
              options={this.countries}
              onChange={this.onCountryChange}
              optionLabel="name"
              filter
              showClear
              filterBy="name"
              placeholder="Ders notları,ödevler ve daha fazlasını ara.."
              valueTemplate={this.selectedCountryTemplate}
              itemTemplate={this.countryOptionTemplate}
          />
        </div>
    );
  }

}