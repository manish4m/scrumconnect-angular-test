import { Component, OnInit } from "@angular/core";
import { Weather } from "./model/weather";
import { Store, select } from "@ngrx/store";
import { loadWeather } from "../weather/store/actions/weather";
import {
  selectAllWeather,
  selectWeatherError,
} from "../weather/store/selectors/weather";

@Component({
  selector: "app-weather",
  template: `
    <app-search (searchChange)="citySearch($event)"></app-search>
    <span class="error-message">{{ error }}</span>
    <app-results [mappedData]="mappedWeatherData"></app-results>
  `,
})
export class WeatherContainer implements OnInit {
  mappedWeatherData: any;
  error: string;

  constructor(private store: Store<Weather>) {}

  ngOnInit() {
    this.listenToStore();
  }

  citySearch(city: string) {
    this.error = "";
    this.store.dispatch(loadWeather({ city }));
  }

  listenToStore() {
    this.store.select(selectAllWeather).subscribe((data) => {
      if (data && data.length > 0) {
        this.mappedWeatherData = this.mapWeatherData(data);
      }
    });

    this.store.select(selectWeatherError).subscribe((data) => {
      if (data) {
        this.error = "City not found. Please enter a valid city name.";
      }
    });
  }

  mapWeatherData(weatherData: Weather[]): any {
    const mappedData = {
      city: "",
      6: null,
      12: null,
      18: null,
      0: null,
    };

    // Loop through the weather data and map the temperature values to the corresponding time
    weatherData.forEach((data) => {
      mappedData.city = data.city;
      const date = new Date(data.dt);
      const hours = date.getHours();
      if (hours === 6) {
        mappedData[6] = data.main.temp;
      } else if (hours === 12) {
        mappedData[12] = data.main.temp;
      } else if (hours === 18) {
        mappedData[18] = data.main.temp;
      } else if (hours === 0) {
        mappedData[0] = data.main.temp;
      }
    });

    return mappedData;
  }
}
