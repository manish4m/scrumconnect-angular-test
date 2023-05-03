import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';


@Component({
  selector: 'app-results',
  templateUrl: './results.component.html'
})
export class ResultsComponent implements OnChanges, OnInit {

  @Input()
  mappedData: any;

  mappedWeatherData: Array<any> = [];

  constructor() {
  }

  ngOnInit() {

  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.mappedData.currentValue) {
      this.mappedWeatherData.push(changes.mappedData.currentValue);
    }
  }
}


