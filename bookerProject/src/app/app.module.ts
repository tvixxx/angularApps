import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {AuthModule} from "./auth/auth.module";

import { AppComponent } from './app.component';
import {UserService} from "./shared/services/users.service";
import {AuthService} from "./shared/services/auth.service";
import {SystemModule} from "./system/system.module";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AuthGuard} from "./shared/services/auth.guard";
import {NotFoundComponent} from "./shared/components/not-found/not-found.component";

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AuthModule,
    BrowserAnimationsModule
  ],
  providers: [UserService, AuthService, AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }
