import { createFeatureSelector, createSelector } from '@ngrx/store';
import { weatherAdapter, WeatherState } from '../reducers/weather';

export const selectWeatherState = createFeatureSelector<WeatherState>('weather');

export const selectAllWeather = createSelector(selectWeatherState, weatherAdapter.getSelectors().selectAll);

export const selectWeatherLoading = createSelector(selectWeatherState, (state) => state.loading);

export const selectWeatherError = createSelector(selectWeatherState, (state) => state.error);
