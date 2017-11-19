import {Component, OnInit, OnDestroy} from '@angular/core';
import {CategoriesService} from "../shared/services/categories.service";
import {EventsService} from "../shared/services/events.service";
import {Observable, Subscription} from "rxjs";
import {CategoryEvent} from "../shared/models/event.model";
import {Category} from "../shared/models/category.model";

import * as moment from 'moment';

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy {

  isLoaded: boolean = false;
  subscription: Subscription;
  categories: Category[] = [];
  events: CategoryEvent[] = [];
  filteredEvents: CategoryEvent[] = [];
  chartData: Array<any> = [];
  isFilterVisible: boolean = false;

  constructor(
    private categoriesService: CategoriesService,
    private eventsService: EventsService
  ) {}

  setOriginalEvents() {
    this.filteredEvents = this.events.slice();
  }

  ngOnInit() {
    this.subscription = Observable.combineLatest(
      this.categoriesService.getCategories(),
      this.eventsService.getEvents()
    ).subscribe((data: [Category[], CategoryEvent[]]) => {
      this.categories = data[0];
      this.events = data[1];

      this.setOriginalEvents();
      this.calculateChartData();

      this.isLoaded = true;
    });
  }

  calculateChartData(): void {
    this.chartData = [];

    this.categories.forEach( (categoryItem: Category) => {
      const categoryEvent = this.filteredEvents.filter((event) => {
        return event.category === categoryItem.id
        && event.type === 'outcome'
      });

      this.chartData.push({
        name: categoryItem.name,
        value: categoryEvent.reduce((total, event: CategoryEvent) => {
          total += event.amount;
          return total
        }, 0)
      });
    });
  }

  private toggleFilterVisibility(state: boolean) {
    this.isFilterVisible = state;
  }

  openFilter() {
    this.toggleFilterVisibility(true);
  }

  onFilterApply(filterData) {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();

    const startPeriod = moment().startOf(filterData.period).startOf('d');
    const endPeriod = moment().endOf(filterData.period).endOf('d');

    this.filteredEvents = this.filteredEvents
      .filter( (event) => {
        return filterData.types.indexOf(event.type) !== -1;
      }).filter( (event) => {
        return filterData.categories.indexOf(event.category.toString()) !== -1;
      })
      .filter( (event) => {
        const momentDate = moment(event.date, 'DD.MM.YYYY HH:mm:ss');
        return momentDate.isBetween(startPeriod, endPeriod);
      });

    this.calculateChartData();
  }

  onFilterCancel() {
    this.toggleFilterVisibility(false);
    this.setOriginalEvents();
    this.calculateChartData();
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
