import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'travelApp';

  public fetchTravelData(origin: any,destination: any,travelDate: any){
    console.log(origin.value);
  }
}
