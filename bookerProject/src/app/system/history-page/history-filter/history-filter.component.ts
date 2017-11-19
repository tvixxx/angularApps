import {Component, Output, EventEmitter, Input, HostListener} from '@angular/core';
import {Category} from "../../shared/models/category.model";

@Component({
  selector: 'app-history-filter',
  templateUrl: './history-filter.component.html',
  styleUrls: ['./history-filter.component.scss']
})
export class HistoryFilterComponent {

  @Input()
  categories: Category[] = [];

  @Output()
  onFilterCancel = new EventEmitter<any>();

  @Output()
  onFilterApply = new EventEmitter<any>();

  @HostListener('document:keydown.escape', ['$event'])
  onKeydownEscHandler(event: KeyboardEvent) {
    this.closeFilter();
  }

  selectedPeriod = 'd';
  timePeriods: Array<any> = [
    {
      type: 'd',
      label: 'День'
    },
    {
      type: 'w',
      label: 'Неделя'
    },
    {
      type: 'M',
      label: 'Месяц'
    }
  ];

  typesEvents: Array<any> = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];
  selectedTypes: Array<any> = [];
  selectedCategories: Array<any> = [];

  closeFilter() {
    this.selectedPeriod = 'd';
    this.selectedTypes = [];
    this.selectedCategories = [];
    this.onFilterCancel.emit();
  }

  applyFilter() {
    this.onFilterApply.emit({
      types: this.selectedTypes,
      categories: this.selectedCategories,
      period: this.selectedPeriod
    });
  }

  private calculateInputParams(field: string, checked: boolean, value: string) {
    if (checked) {
      this[field].indexOf(value) === -1 ? this[field].push(value) : null;
    } else {
      this[field] = this[field].filter(itemValue => itemValue !== value);
    }
  }

  handleChangeType({checked, value}) {
    this.calculateInputParams('selectedTypes', checked, value);
  }

  handleChangeCategory({checked, value}) {
    this.calculateInputParams('selectedCategories', checked, value);
  }

}
