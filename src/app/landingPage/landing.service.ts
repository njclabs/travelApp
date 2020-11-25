import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { retry, catchError } from 'rxjs/operators';
import { throwError, from } from 'rxjs';
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
      if(this.locations.length == 0){
          this.locations.push({
              code: 'LON',
              name: 'LONDON'
          },
          {
              code: 'HAT',
              name: 'HATFIELD'
          })
      }
      return this.locations
  }

  fetchTrainData(origin: any,destination: any,travelDate: any){
 /*   let header = new HttpHeaders();
    header.set('Access-Control-Allow-Origin','*');
    header.set('Access-Control-Allow-Methods','GET,POST,OPTIONS,DELETE,PUT');
*/
    return from(
    fetch(
        'http://localhost:7878/originNames', // the url you are trying to access
      {
        headers: {
          'Content-Type': 'application/json',
        },
        method: 'GET', // GET, POST, PUT, DELETE
        mode: 'no-cors' // the most important option
      }
    ));
      //this.trainData = [];
      //return this.httpClient.get('http://localhost:7878/originNames');
    
      //return this.http.get('http://localhost:7878/originNames');
     // return this.http.get('http://apiops-testing-framework.us-e2.cloudhub.io/api/users/registerUser/subscription');
     /* this.trainData.push(
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
      return this.trainData;*/
  }

  fetchWeatherDetails(location: any) {
      let weatherDetails: any = {
          cityName: "London",
          temperature: '28',
          temp_min: '26',
          temp_max: '28',
          feelsLike: '200',
          humidity: '79',
          weather: 'clear sky',
          clouds: '61',
          windSpeed: '3.09',
          visibility: '10000'
      }
      return weatherDetails;
  }


  fetchCovidData(){
      this.covidData = [];
      this.covidData.push(
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
          },
          {
              location: 'London',
              activeCases: '1000'
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