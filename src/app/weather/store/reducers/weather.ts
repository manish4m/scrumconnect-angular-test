import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { createReducer, on } from '@ngrx/store';

import * as WeatherActions from '../actions/weather';
import { Weather } from '../../model/weather';

export const weatherAdapter = createEntityAdapter<Weather>();

export interface WeatherState extends EntityState<Weather> {
  loading: boolean;
  error: string | null;
}

export const initialWeatherState: WeatherState = weatherAdapter.getInitialState({
  loading: false,
  error: null,
});

export const weatherReducer = createReducer(
  initialWeatherState,
  on(WeatherActions.loadWeather, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(WeatherActions.loadWeatherSuccess, (state, { weather }) => ({
    ...weatherAdapter.addAll(weather, state),
    loading: false,
    error: null,
  })),
  on(WeatherActions.loadWeatherFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  }))
);
