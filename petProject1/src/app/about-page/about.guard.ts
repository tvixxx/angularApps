import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import {NotificationService} from "../notification/notification.service";

@Injectable()
export class AboutGuard implements CanActivate {

    constructor(private notificationService: NotificationService) {}

    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        const props = {
            types: {
                error: 'error',
                success: 'success'
            },
            messages: {
                errorMessage: 'The access denied. You are not an Admin!',
                successMessage: 'Now, you are an Admin!'
            },
            duration: 3000
        };

        if (localStorage.getItem('admin')) {
            this.notificationService.closeNotification();

            return true;
        }

        this.notificationService
            .showNotificationByTime(props.types.error, props.messages.errorMessage, props.duration);

        return (localStorage.getItem('admin')) ? true : false;
    }
}