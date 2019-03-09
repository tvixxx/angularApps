import {
  Directive,
  Input,
  ViewContainerRef,
  TemplateRef,
  OnInit,
  OnDestroy
} from "@angular/core";
import { Subject } from "rxjs";
import { takeUntil } from "rxjs/operators";
import { IfViewportSizeService } from "./services/if-viewport-size.service";
import { ScreenType } from "../../types/screenType.type";

@Directive({
  selector: "[ifViewportSize]"
})
export class IfViewportSizeDirective implements OnInit, OnDestroy {
  private unsubscribe$: Subject<void> = new Subject();
  screen: ScreenType;

  @Input()
  set ifViewportSize(value: ScreenType) {
    this.viewRef.clear();
    this.screen = value;
  }

  constructor(
    private viewRef: ViewContainerRef,
    private templateRef: TemplateRef<any>,
    private ifViewportSizeService: IfViewportSizeService
  ) {}

  ngOnInit() {
    this.ifViewportSizeService.screenType$
      .pipe(takeUntil(this.unsubscribe$))
      .subscribe((screenType: ScreenType) => {
        this.viewRef.clear();

        if (this.screen === screenType) {
          this.viewRef.createEmbeddedView(this.templateRef);
        }
      });
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
