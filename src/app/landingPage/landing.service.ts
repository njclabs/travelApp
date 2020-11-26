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
    this.locations = [];
          this.locations.push({
              code: 'LON',
              name: 'LONDON',
              postalCode: 'AL10 9LO',
              combineLocation: 'LON - London',
              combinePostCode: 'AL10 9LO - LON'
          },
          {
              code: 'HAT',
              name: 'HATFIELD',
              postalCode: 'AL10 9PL',
              combineLocation: 'HAT - Hatfield',
              combinePostCode: 'AL10 9PL - HAT'
          })
      
      return this.locations
  }

  fetchTrainData(origin: any,destination: any,travelDate: any) {
       //return this.httpClient.get('/api/originNames');
      this.trainData = [];
      this.trainData.push(
          {   
              selected: false,
              trainNumber: 1,
              origin: 'London',
              destination: 'Hatfield',
              eta: '22:10',
              etd: '11:11',
              duration: '10'
          },
          {
              selected: true,
              trainNumber: 2,
              origin: 'Australia',
              destination: 'Canada',
              eta: '22:10',
              etd: '11:11',
              duration: '20'
          }
      )
      return this.trainData;
  }

  fetchWeatherDetails(location: any) {
      /*let weatherDetails: any = {
          cityName: "London",
          temperature: '28',
          temp_min: '26',
          temp_max: '28',
          feelsLike: '200',
          humidity: '79',
          weather: 'clear sky',
          clouds: '61',
          windSpeed: '3.09',
          visibility: '10'
      }*/
      return this.httpClient.get('/api/v1/sources/exchange/assets/cd5bf5d6-a7c5-40f7-a8db-9f1046bbc2fd/mytravel-experience-api/1.0.0/m/myTravel/locations/forecast?city=New+York&date=2020-11-23');
     // return weatherDetails;
  }


  fetchCovidData(){
      this.covidData = [];
      this.covidData.push(
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'Hatfield',
              activeCases: '1'
          },
          {
              location: 'Redhill',
              activeCases: '28'
          },
          {
              location: 'Bath',
              activeCases: '222'
          },
          {
              location: 'Reading',
              activeCases: '1'
          },
          {
              location: 'Bristol',
              activeCases: '2000'
          },
          {
              location: 'Brighton',
              activeCases: '5'
          },
          {
              location: 'Barmingham',
              activeCases: '15'
          }
      )
      return this.covidData;
  }
}

interface TrainData {
  trainNumber: String;
  origin: String;
  destination: String;
  eta: String;
  etd: String
}

