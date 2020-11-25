import { Component, OnInit, forwardRef } from '@angular/core';
import { LandingService } from '../landing.service';
import {SelectionModel} from '@angular/cdk/collections';
import {MatTableDataSource} from '@angular/material/table';
import { MatCheckboxDefaultOptions, MAT_CHECKBOX_DEFAULT_OPTIONS } from '@angular/material/checkbox';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [LandingService]
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


  constructor(landingService: LandingService) { 
    this.landingPageService = landingService;
  }

  ngOnInit() {
    this.locations = this.landingPageService.getLocations();
    this.covidData = this.landingPageService.fetchCovidData();
    this.trainData = this.landingPageService.fetchTrainData(1,2,3)
  }

  public fetchTravelData(origin: any,destination: any,travelDate: any){
    this.loading = true
    this.showWeatherAndCovidData = true;
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
}
