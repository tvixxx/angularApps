import {OnInit, Component} from "@angular/core";

@Component({
    selector: 'app-not-found',
    template: `<div class="not-found">
        <h1 class="not-found__title">Page is not find!</h1>
        <a [routerLink]="['/']" class="not-found__link common-btn">Home page</a>
    </div>
    `,
    styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

    ngOnInit() {}
}