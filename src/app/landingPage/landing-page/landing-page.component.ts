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
  public toggle = false;
  public loading = false;
  public weatherDetails = [];
  public isCollapsed = false;
  public originModel: any;
  public destinationModel: any;
  public originPostCodeModel:any;
  public destinationPostCodeModel: any;

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
          if(location.code.toLowerCase().indexOf(term.toLocaleLowerCase()) !== -1
           ||  location.name.toLowerCase().indexOf(term.toLocaleLowerCase()) !== -1){
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
        : this.locations.filter(location => {
          if(location.postalCode.toLowerCase().indexOf(term.toLocaleLowerCase()) !== -1){
            return true;
          }
          return false;
        }).splice(0, 10))
    )

    formatter = (value: any) => value.combineLocation;
    inputFormatter = (value: any) => value.combineLocation;
    
    postCodeformatter = (value: any) => value.postalCode
    inputPostCodeFormatter = (value: any) => value.postalCode

  ngOnInit() {
    this.locations = this.landingPageService.getLocations();
 /*  this.landingPageService.getLocations().subscribe(data => {
     console.log(data)
   },
   error => {
     return console.log('oops', error);
   }
   );*/
    this.covidData = this.landingPageService.fetchCovidData();
    this.trainData = this.landingPageService.fetchTrainData(1,2,3)
    this.isCollapsed = false;
  }

  public fetchTravelData(origin: any,destination: any,travelDate: any){
    this.loading = true
    this.showWeatherAndCovidData = true;
    this.isCollapsed = true;
   /*this.landingPageService.fetchTrainData()
    .subscribe(
        data => {
          console.log('success', data),
          this.trainData = data;
          console.log('success', data),
          this.showWeatherAndCovidData = true;
          this.loading = false; 
        },
        error => console.log('oops', error)
    );*/
    this.trainData = [{   
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
  }]
  this.loading = false
   // this.trainData = this.landingPageService.fetchTrainData(origin,destination,travelDate)
   // this.showWeatherAndCovidData = true;

   this.weatherDetails = this.landingPageService.fetchWeatherDetails(destination);
  }

  subscribeTrain() {
    console.log('h')
    this.toggle = true;
    
    this.subscribeTrainText = "Subscribing";
    for (let i = 0; i < 300000; i++) {
      
    }
    console.log(this.trainData.filter((train) => {
      return train.selected
    }))
    this.subscribeTrainText = "Subscribe Trains";
    this.toggle = false;
  }

  showWeather(){
    this.isCollapsed = !this.isCollapsed;
  }
}
