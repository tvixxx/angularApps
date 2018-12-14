import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from './app.component';
import { LoaderComponent } from "./components/loader.component";
import { GravatarDirective } from './directives/gravatar.directive';

@NgModule({
  declarations: [
    AppComponent,
    LoaderComponent,
    GravatarDirective,
  ],
  imports: [
    BrowserModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
