import { Component, OnInit } from '@angular/core';
import {AppService} from "../../service/app.service";
import {FormControl, FormGroup} from "@angular/forms";
import { formatDate} from "@angular/common";



export interface weather {
  weather_name: string,
  weather_abbr: string,
  min_temp: number,
  max_temp: number,
  the_temp:number,
  wind_speed:number ,
  humidity: number,
  created:string
}

@Component({
  selector: 'app-weather-search',
  templateUrl: './weather-search.component.html',
  styleUrls: ['./weather-search.component.scss']
})



export class WeatherSearchComponent implements OnInit {

  city:string='';
  date:any;
  weatherInfo:weather[] = []

  // Default weather set on london

  constructor(private service:AppService){}



  ngOnInit(): void {
     this.date = formatDate(new Date(), 'yyyy/MM/dd', 'en')

    // Default
    this.searchWeather(44418,this.date)
  }


  searchForm = new FormGroup({
    city:new FormControl('')
  })


  findWoeId() {
    this.service.findWoeId(this.searchForm.value.city).subscribe((response:any)=>{
      if (response){
        this.city = response[0].title
        this.searchWeather(response[0].woeid,this.date)

      }
    })
  }

  searchWeather(id:number,date:string){
    this.service.search(id,date).subscribe((response:any)=>{
      console.log(response)
      this.weatherInfo = response.filter((item:any) =>new Date( item.created).getUTCDate() == 12 )
      this.weatherInfo = this.weatherInfo.map((item:any)=>{
        return {
          weather_name: item.weather_state_name,
          weather_abbr: item.weather_state_abbr,
          min_temp: Math.round(item.min_temp),
          max_temp: Math.round(item.max_temp),
          the_temp:Math.round(item.the_temp),
          wind_speed:Math.round(item.wind_speed) ,
          humidity: Math.round(item.humidity),
          created: new Date(item.created).getUTCHours() + " : " + '0'+'0'
        }
      })

    })
  }

}
