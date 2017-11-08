import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

    badgeTypes = ['Angular', 'Redux', 'Vue', 'WebPack'];

    @Input()
    search;

    @Output()
    changeQuery = new EventEmitter();

    @Output()
    changeQueryByBadge = new EventEmitter();

    constructor() {
    }

    ngOnInit() {}

    changeQueryByInput(event) {
        this.changeQuery.emit(this.search);
    }

    changeByBadgeName(name) {
        this.changeQueryByBadge.emit(name);
    }
}