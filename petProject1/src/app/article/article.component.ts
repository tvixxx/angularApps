import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";

@Component({
    selector: 'app-article',
    templateUrl: './article.component.html',
    styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {

    @Input()
    item;

    @Input()
    styles;

    @Output()
    change = new EventEmitter();

    @Output()
    changedTitle: EventEmitter<any> = new EventEmitter();

    @Output()
    removeArticle: EventEmitter<any> = new EventEmitter();

    editing: boolean = false;

    constructor(
        private router: Router,
        activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {

    }

    goToAbout(id) {
        this.router.navigate(['about', id]);
    }

    editHandler() {

        if (this.editing) {
            this.changedTitle.emit(this.item);
        }

        this.editing = !this.editing;
    }

    inputHandler(value) {
        this.item.name = value;
    }

    removeHandler() {
        this.removeArticle.emit(this.item);
    }
}