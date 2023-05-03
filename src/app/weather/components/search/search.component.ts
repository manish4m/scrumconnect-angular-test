import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { Weather } from '../../model/weather';
import { loadWeather } from '../../store/actions/weather';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html'
})
export class SearchComponent {
  city: string;

  @Output()
  searchChange = new EventEmitter<string>();

  constructor() { }

  search() {
    this.searchChange.emit(this.city);
  }
}
