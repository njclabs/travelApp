import { Component, OnInit, forwardRef } from '@angular/core';
import { LandingService } from '../landing.service';
import {Observable} from 'rxjs';
import {NgbTypeaheadConfig} from '@ng-bootstrap/ng-bootstrap';
import {debounceTime, distinctUntilChanged, map} from 'rxjs/operators';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [LandingService, NgbTypeaheadConfig]
})
export class LandingPageComponent implements OnInit {
  title = 'travelApp';
  landingPageService=null;
  public locations = []
  public trainData = []
  public covidData = []
  public showWeatherAndCovidData = false;
  public subscribeTrainText = "Subscribe Trains";
  public weatherDetails = [];
  public isCollapsed = false;
  public originModel: any;
  public destinationModel: any;
  public originPostCodeModel:any;
  public destinationPostCodeModel: any;
  public dummy: any[];
  public validationMessage: string;
  public postCodes: string[] = [];

  constructor(landingService: LandingService, config: NgbTypeaheadConfig) { 
    this.landingPageService = landingService;
    this.isCollapsed = false;
    config.showHint = true;
  }

  locationSearch = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.locations.filter(location => {
          if(location.stationCode.toLowerCase().indexOf(term.toLocaleLowerCase()) !== -1
           ||  location.stationName.toLowerCase().indexOf(term.toLocaleLowerCase()) !== -1){
            return true;
          }
          return false;
        }).splice(0, 10))
    )

    postalCodeSearch= (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map(term => term.length < 2 ? []
        : this.postCodes.filter(post => {
          if(post.toLowerCase().indexOf(term.toLocaleLowerCase()) !== -1){
            return true;
          }
          return false;
        }).splice(0, 10))
    )

    formatter = (value: any) => value.stationCode + ' - ' + value.stationName;
    inputFormatter = (value: any) => value.stationCode + ' - ' + value.stationName;
    
    postCodeformatter = (value: any) => value
    inputPostCodeFormatter = (value: any) => value

    ngOnInit() {
      const self = this;
      this.landingPageService.getLocations().subscribe(data => {
           this.locations = data,
           data.forEach(element => {
            element.postCodes.forEach(post =>{
              self.postCodes.push(post);
            });         
           });
        },
        
        error => console.log('Exception while fetching locations: ', error)
      );
      this.landingPageService.fetchCovidData().subscribe(data => {
        this.covidData = data;
      });
      this.isCollapsed = false;
    }

    public fetchTravelData(origin: any,destination: any,travelDate: any, originPostCode: any, 
      destinationPostCode: any){
      this.validationMessage = '';
      if((origin == '' || origin == null) && (originPostCode == '' || originPostCode == null)){
        this.validationMessage = this.validationMessage + 'Origin cannot be empty.'
      } 

      if((destination == '' || destination == null) && (destinationPostCode == '' || destinationPostCode == null)){
        this.validationMessage = this.validationMessage + ' Destination cannot be empty.'
      }
      if(travelDate == '' || travelDate == null){
        this.validationMessage = this.validationMessage + ' Travel date cannot be empty.'
      }
      
      if ((origin == destination) && origin != null && origin != '' && destination != null && destination != '') {
        this.validationMessage = this.validationMessage + 'Origin and destination cannot be same.'
      }

      if ((originPostCode == destinationPostCode) && originPostCode != null && originPostCode != '' 
      && destinationPostCode != null && destinationPostCode != '') {
        this.validationMessage = this.validationMessage + 'Origin and destination postal code cannot be same.'
      }
      //TODO: validation based on postal code

      if (this.validationMessage !== '') {
        return;
      }

      let originCode = '';
      let originType = 'L'
      if (origin != '' && origin != null){
        originCode = origin.split(' - ')[0];
      } else {
        origin = this.getCodeFromPostalCode(originPostCode);  
        originType = 'P'
      }

      let destinationCode = '';
      let destType = 'L';
      if (destination != '' && destination != null){
        destinationCode = destination.split(' - ')[0];
      } else {
        destinationCode = this.getCodeFromPostalCode(destinationPostCode);  
        destType = 'P'
      }

      this.showWeatherAndCovidData = true;
      this.isCollapsed = true;
      this.landingPageService.fetchTrainData(originCode,destinationCode,travelDate,originType,destType)
       .subscribe(
        data => {
          this.trainData = data;
          this.showWeatherAndCovidData = true;
        },
        error => console.log('oops', error)
    );
   
    this.landingPageService.fetchWeatherDetails(destinationCode, travelDate).subscribe(
      data => {
        this.weatherDetails = data;
        this.weatherDetails['visibility'] = (this.weatherDetails['visibility']/1000).toFixed(1);
        this.weatherDetails['temperature'] = (this.weatherDetails['temperature'] - 273.15).toFixed(1); 
      },
      error => console.log('Error fetching weather details : ', error)
    );
  }

  getCodeFromPostalCode(code: string): any{
    let stationCode = '';
    this.locations.forEach(element => {
      element.postCodes.forEach(post =>{
        if (code == post){
          stationCode = element.stationCode;
          return; 
        }
      });         
     });
     return stationCode;
  }

  showWeather(){
    this.isCollapsed = !this.isCollapsed;
  }
}

interface WeatherDetails {
  cityName: any,
  temperature: any,
  temp_min: any,
  temp_max: any,
  feelsLike: any,
  humidity: any,
  weather: any,
  clouds: any,
  windSpeed: any,
  visibility: any
}

interface Locations {
  stationCode: any,
  stationName: any,
  postalCode: any[]
}

interface TrainData {
  trainNumber: String;
  origin: String;
  destination: String;
  eta: String;
  etd: String;
  duration: string;
}

