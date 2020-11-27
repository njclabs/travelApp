import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, from, Observable } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class LandingService {
  private locations = [];
  private trainData = [];
  private covidData = [];

  constructor(private httpClient: HttpClient) { }
  
  getLocations(){
     let api = '/api/v1/sources/exchange/assets/cd5bf5d6-a7c5-40f7-a8db-9f1046bbc2fd/mytravel-experience-api/1.0.2/m/myTravel/locations/stations';
   //api = '/api/myTravel/locations/stations'
     return this.httpClient.get(api);
  }

  fetchAttractionSpots(destination: string) {
    let api = '/api/v1/sources/exchange/assets/cd5bf5d6-a7c5-40f7-a8db-9f1046bbc2fd/mytravel-experience-api/1.0.3/m/myTravel/locations/attractionspots?';
     api = api +  'city=' + destination;
     return this.httpClient.get(api);
      
  }

  fetchTrainData(origin: string,destination: string,travelDate: string, originType: string,destType: string) {
      let api = '/api/v1/sources/exchange/assets/cd5bf5d6-a7c5-40f7-a8db-9f1046bbc2fd/mytravel-experience-api/1.0.3/m/myTravel/locations/stations/trains?';
      api = api + 'originCode=' + origin + '&originType=' + originType + '&destinationCode=' + destination + 
      '&destType=' + destType + '&travelDate=' + travelDate;
      return this.httpClient.get(api);
  }

  fetchWeatherDetails(location: any, date: any) {
    let api = '/api/v1/sources/exchange/assets/cd5bf5d6-a7c5-40f7-a8db-9f1046bbc2fd/mytravel-experience-api/1.0.0/m/myTravel/locations/forecast?';
    api = api + 'city=' + location + '&date=' + date;
    return this.httpClient.get(api);
  }

  fetchCovidData(){
    return this.httpClient.get('/api/v1/sources/exchange/assets/cd5bf5d6-a7c5-40f7-a8db-9f1046bbc2fd/mytravel-experience-api/1.0.3/m/myTravel/locations/covid/areaname');
  }
}



