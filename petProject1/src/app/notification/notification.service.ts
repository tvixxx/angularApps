import {Injectable} from "@angular/core";
import {BehaviorSubject} from 'rxjs';

@Injectable()
export class NotificationService {

    state$: BehaviorSubject<any> = new BehaviorSubject({value: false});
    notification$: BehaviorSubject<any> = new BehaviorSubject({type: 'error', description: 'Error!'});
    props = {
        types: {
            error: 'error',
            success: 'success'
        },
        messages: {
            errorMessage: 'The access denied. You are not an Admin!',
            successMessage: 'Now, you are an Admin!',
            notAdmin: 'Now, you are not an Admin'
        },
        duration: 3000
    };

    constructor() {}

    showNotification(type, description) {
        this.notification$.next({type, description});
        this.state$.next({value: true});
    }

    showNotificationByTime(type, description, ms) {
        this.showNotification(type, description);

        setTimeout(() => {
            this.state$.next({value: false})
        }, ms);
    }

    closeNotification() {
        this.state$.next({value: false})
    }
}