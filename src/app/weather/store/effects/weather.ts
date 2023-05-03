import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { WeatherService } from '../../weather.service';
import * as WeatherActions from '../actions/weather';

@Injectable()
export class WeatherEffects {
  constructor(private actions$: Actions, private weatherService: WeatherService) {}

  loadWeather$ = createEffect(() =>
    this.actions$.pipe(
      ofType(WeatherActions.loadWeather),
      switchMap((action) =>
        this.weatherService.searchWeatherForCity(action.city).pipe(
          map((weather) => WeatherActions.loadWeatherSuccess({ weather })),
          catchError((error) => of(WeatherActions.loadWeatherFailure({ error })))
        )
      )
    )
  );
}
