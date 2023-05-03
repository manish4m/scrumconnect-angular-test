import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Weather } from './model/weather';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class WeatherService {
  url = 'https://api.openweathermap.org/data/2.5/forecast';
  params = {
    q: '',
    cnt: '8',
    units: 'metric',
    APPID: 'c4c0c7fa0ae333f3c515a1670face7ee'
  };

  constructor(private http: HttpClient) { }

  searchWeatherForCity(city: string): Observable<Weather[]> {

    this.params.q = city;
    return this.http.get<any>(this.url, {params: this.params}).pipe(
      map(response => response.list),
      map(list => list.map(data => ({city, id: data.dt, dt: data.dt_txt, main: data.main })))
    );
  }
}
