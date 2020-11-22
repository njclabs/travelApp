import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AppService]
})
export class AppComponent implements OnInit{
  title = 'travelApp';
  appService=null;
  public locations = []
  public trainData = []
  public covidData = []
  public showWeatherAndCovidData = false;


  constructor(appService: AppService){
    this.appService = appService;  
  }

  ngOnInit() {
    this.locations = this.appService.getLocations();
    this.covidData = this.appService.fetchCovidData();
  }

  public fetchTravelData(origin: any,destination: any,travelDate: any){
    this.trainData = this.appService.fetchTrainData(origin,destination,travelDate)
    this.showWeatherAndCovidData = true;
  }
}
