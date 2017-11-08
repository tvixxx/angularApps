import {Component, OnInit} from '@angular/core';
import {NotificationService} from "../notification/notification.service";

@Component({
    selector: 'app-main-navigation',
    templateUrl: './main-navigation.component.html',
    styleUrls: ['./main-navigation.component.css']
})
export class MainNavigationComponent implements OnInit {

    notificationState;

    constructor(
        private notificationService: NotificationService
    ) {
    }

    ngOnInit() {
        this.notificationState = this.notificationService.state$.value.value;
    }

    becomeAdmin(event) {
        event.preventDefault();
        let notification = this.notificationService;

        localStorage.setItem('admin', 'true');

        if (!this.notificationState) {
            this.notificationService
                .showNotificationByTime(
                    notification.props.types.success,
                    notification.props.messages.successMessage,
                    notification.props.duration
                );

            this.notificationState = true;
        }
    }

    becomeUser(event) {
        let notification = this.notificationService;
        localStorage.removeItem('admin');

        if (this.notificationState) {
            this.notificationService.closeNotification();
            this.notificationService
                .showNotificationByTime(
                    notification.props.types.error,
                    notification.props.messages.notAdmin,
                    notification.props.duration
                );

            this.notificationState = false;
        }
    }
}