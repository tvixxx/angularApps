import {Component, OnInit, Input} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {CategoryEvent} from "../../shared/models/event.model";

@Component({
  selector: 'app-history-events',
  templateUrl: './history-events.component.html',
  styleUrls: ['./history-events.component.scss']
})
export class HistoryEventsComponent implements OnInit {

  @Input()
  categories: Category[] = [];
  @Input()
  events: CategoryEvent[] = [];

  searchValue: string = '';
  searchPlaceholder = 'Сумма';
  searchField = 'amount';
  params = {
    amount: 'Сумма',
    date: 'Дата',
    category: 'Категория',
    type: 'Тип',
  };

  constructor() { }

  ngOnInit() {
    this.events.forEach((eventItem) => {
      eventItem.categoryName = this.categories
        .find(categoryItem => categoryItem.id === eventItem.category).name;
    });
  }

  changeCriteria(field: string) {
    this.searchPlaceholder = this.params[field];
    this.searchField = field;
  }

}
