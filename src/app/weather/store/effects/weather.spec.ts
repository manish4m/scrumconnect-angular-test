import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable, of } from 'rxjs';
import { WeatherService } from '../../weather.service';
import * as WeatherActions from '../actions/weather';
import { WeatherEffects } from '../effects/weather';
import { WeatherState } from '../reducers/weather';
import { Weather } from '../../model/weather';

const initialState = {
  id:1,
  dt:16,
  city:'London',
  main:{temp:23}
};

const mockWeather = [
  {
    id: 1,
    city: 'London',
    dt: 12,
    main:{temp:30}
  },
];

class MockWeatherService {
  searchWeatherForCity(city:string) {
    return of(mockWeather);
  }
}

describe('WeatherEffects', () => {
  let actions$: Observable<any>;
  let effects: WeatherEffects;
  let store: MockStore<WeatherState>;
  let httpService: WeatherService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        WeatherEffects,
        MockStore,
        provideMockActions(() => actions$),
        provideMockStore({ initialState }),
        { provide: WeatherService, useClass: MockWeatherService },
      ],
    });

    effects = TestBed.get(WeatherEffects);
    store = TestBed.get(MockStore);
    httpService = TestBed.get(WeatherService);
  });

  it('should be created', () => {
    expect(effects).toBeTruthy();
  });

  // Testing API interaction
  describe('loadWeather$', () => {
    it('should return a loadWeatherSuccess action with the weather data on success', (done) => {
      const spy = spyOn(httpService, 'searchWeatherForCity').and.callThrough();
      actions$ = of(WeatherActions.loadWeather);
      effects.loadWeather$.subscribe((res) => {
        expect(res).toEqual(WeatherActions.loadWeatherSuccess({ weather: mockWeather }));
        expect(spy).toHaveBeenCalledTimes(1);
        done();
      });
    });
  });
});