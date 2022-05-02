import { Injectable } from '@angular/core';
// import * as countrycitystatejson from 'countrycitystatejson';
const countrycitystatejson = require('countrycitystatejson');

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  private countryData = countrycitystatejson;

  constructor() { }

  getCountries() {
    return this.countryData.getCountries();
  }

  getStatesByCountry(countryShotName: string) {
    return this.countryData.getStatesByShort(countryShotName);
  }

  getCitiesByState(country: string, state: string) {
    return this.countryData.getCities(country, state);
  }
}
