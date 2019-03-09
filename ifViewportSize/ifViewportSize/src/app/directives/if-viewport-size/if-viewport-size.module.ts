import { NgModule, ModuleWithProviders } from "@angular/core";
import { CommonModule } from "@angular/common";
import { IfViewportSizeDirective } from "./if-viewport-size.directive";
import { IfViewportSizeService } from "./services/if-viewport-size.service";

@NgModule({
  imports: [CommonModule],
  declarations: [IfViewportSizeDirective],
  exports: [IfViewportSizeDirective]
})
export class IfViewportSizeModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: IfViewportSizeModule,
      providers: [IfViewportSizeService]
    };
  }
}
