import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { provideMockStore } from "@ngrx/store/testing";
import { CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { WeatherContainer } from "./weather.container";
import { Store, StoreModule } from "@ngrx/store";
import { Weather } from "./model/weather";
import { SearchComponent } from "./components/search/search.component";
import { ResultsComponent } from "./components/results/results.component";
import { WeatherService } from "./weather.service";
import { of } from "rxjs";
import { FormsModule } from "@angular/forms";
import { EffectsModule } from "@ngrx/effects";
import { weatherReducer } from "./store/reducers/weather";
import { WeatherEffects } from "./store/effects/weather";

describe("WeatherContainer", () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store<Weather>;

  beforeEach(async(() => {
    const initialState = { cities: [] };
    TestBed.configureTestingModule({
      declarations: [WeatherContainer, SearchComponent, ResultsComponent],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: WeatherService,
          useValue: {
            getForecast: () => of({ list: [] }),
          },
        },
      ],
      imports: [
        FormsModule,
        StoreModule.forRoot({}),
        EffectsModule.forRoot([]),
        StoreModule.forFeature("weather", weatherReducer),
        EffectsModule.forFeature([WeatherEffects]),
      ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  // PLEASE IMPLEMENT MORE TESTS
  it('should dispatch a search action when a city is searched', () => {
    spyOn(store, 'dispatch');
    const searchValue = 'New York';
    component.citySearch(searchValue);
    expect(store.dispatch).toHaveBeenCalledWith(
      { type: '[Weather] Load', city: searchValue }
    );
  });
});
