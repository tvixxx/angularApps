import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {Category} from "../../shared/models/category.model";
import {CategoryEvent} from "../../shared/models/event.model";

import * as moment from 'moment';
import {EventsService} from "../../shared/services/events.service";
import {BillService} from "../../shared/services/bill.service";
import {Bill} from "../../shared/models/bill.model";
import {Message} from "../../../shared/models/message.model";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.scss']
})
export class AddEventComponent implements OnInit, OnDestroy {

  sub1: Subscription;
  sub2: Subscription;

  @Input()
  categories: Category[] = [];

  types = [
    {type: 'income', label: 'Доход'},
    {type: 'outcome', label: 'Расход'}
  ];

  message: Message;

  messageTypes = {
    error: 'error',
    danger: 'danger',
    success: 'success'
  };

  constructor(
    private eventsService: EventsService,
    private billService: BillService) {
  }

  ngOnInit() {
    this.message = new Message('', '');
  }

  private showMessage(type: string, text: string,) {
    this.setMessageData(this.message, type, text);
    setTimeout(() => this.message.text = '', 25000);
  }

  private setMessageData(object, messageType, messageText) {
    object.type = messageType;
    object.text = messageText;
  }

  onSubmit(form) {

    let {type, amount, category, description} = form.value;
    let date = moment().format('DD.MM.YYYY HH:mm:ss');

    if (amount < 0) {
      amount *= -1;
    }

    const categoryEvent = new CategoryEvent(
      type, amount, +category, date, description
    );

    this.sub1 = this.billService.getBill().subscribe( (bill: Bill) => {
      let value = 0;

      if (type === 'outcome') {
        if (amount > bill.value) {
          this.showMessage(
            this.messageTypes.danger,
            `Недостаточно средств. Вам нехватает ${amount - bill.value}`);
          return;
        } else {
          value = bill.value - amount;
        }
      }

      if (type === 'income') {
        value = bill.value + amount;
      }

      this.sub2 = this.billService.updateBill({value, currency: bill.currency})
        .mergeMap( () => this.eventsService.addEvent(categoryEvent))
        .subscribe( () => {
          this.showMessage(this.messageTypes.success, `Данные успешно добавлены!`);
          form.setValue({
            amount: 0,
            description: ' ',
            category: 1,
            type: 'outcome'
          })
        })
    });
  }

  ngOnDestroy() {

    [this.sub1, this.sub2].forEach(item => {
      if (item) {
        item.unsubscribe()
      }
    });
  }
}
