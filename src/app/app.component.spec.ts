import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { WeatherContainer } from './weather/weather.container';
import { SearchComponent } from './weather/components/search/search.component';
import { ResultsComponent } from './weather/components/results/results.component';
import { FormsModule } from '@angular/forms';
import { Weather } from './weather/model/weather';
import { Store, StoreModule } from '@ngrx/store';
import { provideMockStore } from '@ngrx/store/testing';
import { WeatherService } from './weather/weather.service';
import { of } from 'rxjs';
import { EffectsModule } from '@ngrx/effects';

describe('AppComponent', () => {
  let component: WeatherContainer;
  let fixture: ComponentFixture<WeatherContainer>;
  let store: Store<Weather>;
  beforeEach(async(() => {
    const initialState = { cities: [] };
    TestBed.configureTestingModule({
      imports:[FormsModule, StoreModule.forRoot({}),
        EffectsModule.forRoot([])],
      declarations: [
        AppComponent, WeatherContainer, SearchComponent, ResultsComponent
      ],
      providers: [
        provideMockStore({ initialState }),
        {
          provide: WeatherService,
          useValue: {
            getForecast: () => of({ list: [] })
          }
        }
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeatherContainer);
    component = fixture.componentInstance;
    store = TestBed.get(Store);
    fixture.detectChanges();
  });


  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'scrumconnect-angular-test'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('scrumconnect-angular-test');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to scrumconnect-angular-test!');
  });
});
