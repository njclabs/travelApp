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
  public message = "hello hi how are you?";

  checked = false;
  indeterminate = false;
  labelPosition: 'before' | 'after' = 'after';
  disabled = false;

  constructor(landingService: LandingService) { 
    this.landingPageService = landingService;
  }

  ngOnInit() {
    this.locations = this.landingPageService.getLocations();
    this.covidData = this.landingPageService.fetchCovidData();
    this.trainData = this.landingPageService.fetchTrainData(1,2,3)
  }

  public fetchTravelData(origin: any,destination: any,travelDate: any){
    this.trainData = this.landingPageService.fetchTrainData(origin,destination,travelDate)
    this.showWeatherAndCovidData = true;
  }

  subscribeTrain() {
    console.log(this.trainData.filter((train) => {
      return train.selected
    }))
  }
}
