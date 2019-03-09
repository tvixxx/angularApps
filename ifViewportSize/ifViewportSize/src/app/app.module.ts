import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";

import { IfViewportSizeModule } from "./directives/if-viewport-size/if-viewport-size.module";

import { AppComponent } from "./app.component";
import { HelloComponent } from "./hello.component";
import { TestComponent } from "./test.component";

import { Config as ConfigConstant, APP_CONFIG } from "./constants/config";

@NgModule({
  declarations: [AppComponent, HelloComponent, TestComponent],
  imports: [BrowserModule, CommonModule, IfViewportSizeModule.forRoot()],
  providers: [
    {
      provide: APP_CONFIG,
      useValue: ConfigConstant
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
