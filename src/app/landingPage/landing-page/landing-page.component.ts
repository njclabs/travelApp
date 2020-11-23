import { Component, OnInit } from '@angular/core';
import { LandingService } from '../landing.service';

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

  constructor(landingService: LandingService) { 
    this.landingPageService = landingService;
  }

  ngOnInit() {
    this.locations = this.landingPageService.getLocations();
    this.covidData = this.landingPageService.fetchCovidData();
  }

  public fetchTravelData(origin: any,destination: any,travelDate: any){
    this.trainData = this.landingPageService.fetchTrainData(origin,destination,travelDate)
    this.showWeatherAndCovidData = true;
  }

}
