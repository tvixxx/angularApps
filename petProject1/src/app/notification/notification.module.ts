import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

import {NotificationComponent} from "./notification.component";

@NgModule({
    declarations: [
        NotificationComponent
    ],
    imports: [
        CommonModule,
        BrowserAnimationsModule
    ],
    exports: [
        CommonModule, NotificationComponent
    ]
})
export class NotificationModule {}