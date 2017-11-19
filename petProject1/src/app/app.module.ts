import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterModule} from '@angular/router';
import {JsonpModule, HttpModule} from "@angular/http";

import {routes} from "./route/routes";

import {AppComponent} from './app.component';
import {HomeComponent} from './home/home.component';
import {ArticleComponent} from './article/article.component';
import {AboutComponent} from './about/about.component';
import {SearchComponent} from './search/search.component';
import {AboutPageComponent} from './about-page/about-page.component';
import {MainNavigationComponent} from './main-navigation/main-navigation.component';

import {BackgroundDirective} from './shared/directives/background.directive';
import {ExpandDescriptionDirective} from './shared/directives/expand-description.directive';

import {AboutService} from "./about-page/about.service";
import {AboutGuard} from "./about-page/about.guard";

import {PhonePipe} from './shared/phone.pipe';
import {SearchArticlePipe} from './shared/search-article.pipe';
import {ArticleService} from "./shared/article.service";
import {NotificationModule} from "./notification/notification.module";
import {NotificationService} from "./notification/notification.service";
import {NotFoundComponent} from "./not-found/not-found.component";

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        ArticleComponent,
        SearchComponent,
        BackgroundDirective,
        ExpandDescriptionDirective,
        AboutComponent,
        MainNavigationComponent,
        PhonePipe,
        AboutPageComponent,
        SearchArticlePipe,
        NotFoundComponent
    ],
    imports: [
        BrowserModule,
        NotificationModule,
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(routes),
        JsonpModule,
        HttpModule,
    ],
    providers: [
        AboutService,
        AboutGuard,
        ArticleService,
        NotificationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}