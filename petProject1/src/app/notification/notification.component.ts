import {Component, OnInit} from "@angular/core";
import {trigger, state, style, animate, transition, keyframes} from '@angular/animations';

import {NotificationService} from "./notification.service";

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.css'],
    animations: [
        trigger('notification', [
            transition('* => void', [
                style({opacity: '1'}),
                animate(100, style({opacity: '0'}))
            ]),
            transition('void => *', [
                style({opacity: '0'}),
                animate(100, style({opacity: '1'}))
            ])
        ])
    ]
})
export class NotificationComponent implements OnInit {
    type: string;
    description: string;
    notificationState;

    constructor(private notificationService: NotificationService) {}

    ngOnInit() {
        this.notificationService.notification$.subscribe((data) => {
            this.type = data.type;
            this.description = data.description;
        });

        this.notificationService.state$.subscribe((data) => {
            this.notificationState = data.value;
        });
    }
}