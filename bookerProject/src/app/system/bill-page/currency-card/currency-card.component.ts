import {Component, OnInit, Input} from '@angular/core';

@Component({
  selector: 'app-currency-card',
  templateUrl: './currency-card.component.html',
  styleUrls: ['./currency-card.component.scss']
})
export class CurrencyCardComponent implements OnInit {

  @Input()
  currency: any;

  currencies: Array<string> = ['USD', 'EUR'];

  constructor() { }

  ngOnInit() {}

}
