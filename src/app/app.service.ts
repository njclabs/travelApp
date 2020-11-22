import { Injectable } from '@angular/core'

@Injectable({
    providedIn: 'root',
  })
export class AppService{
    private locations = [];
    private trainData = [];
    private covidData = [];
    
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
        this.trainData = [];
        this.trainData.push(
            {
                trainNumber: 1,
                origin: 'London',
                destination: 'Hatfield',
                eta: '22:10',
                etd: '11:11',
                duration: '10'
            },
            {
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