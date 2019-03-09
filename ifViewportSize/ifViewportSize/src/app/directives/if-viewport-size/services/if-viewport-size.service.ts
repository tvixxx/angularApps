import { Injectable, Inject } from "@angular/core";
import { Observable, Subject, fromEvent, BehaviorSubject } from "rxjs";
import {
  takeUntil,
  debounceTime,
  distinctUntilChanged,
  map
} from "rxjs/operators";

import { APP_CONFIG } from "../../../constants/config";
import { IConfig } from "../../../interfaces/config.interface";

const Screens = {
  small: "small",
  medium: "medium",
  large: "large"
};

@Injectable()
export class IfViewportSizeService {
  config: IConfig;
  public screenWidth$: BehaviorSubject<number> = new BehaviorSubject(
    window.innerWidth
  );
  public screenType$: Observable<string>;

  private unsubscribe$: Subject<void> = new Subject();

  constructor(@Inject(APP_CONFIG) config: IConfig) {
    fromEvent(window, "resize")
      .pipe(
        debounceTime(500),
        map((event: Event) => window.innerWidth),
        takeUntil(this.unsubscribe$)
      )
      .subscribe((screenWidth: number) => {
        this.setViewportSize(screenWidth);
      });

    this.screenType$ = this.screenWidth$.pipe(
      distinctUntilChanged(),
      map((viewportWidth: number) => {
        const { medium, large } = config;
        const isSmallScreen = viewportWidth < medium;

        if (isSmallScreen) {
          return Screens.small;
        }

        const isMediumScreen = medium <= viewportWidth && viewportWidth < large;

        if (isMediumScreen) {
          return Screens.medium;
        }

        const isLargeScreen = large <= viewportWidth;

        if (isLargeScreen) {
          return Screens.large;
        }
      }),
      takeUntil(this.unsubscribe$)
    );
  }

  setViewportSize(viewportWidth: number) {
    if (viewportWidth !== this.getViewportSize()) {
      this.screenWidth$.next(viewportWidth);
    }
  }

  getViewportSize(): number {
    return this.screenWidth$.getValue();
  }

  ngOnDestroy() {
    this.unsubscribe$.next();
    this.unsubscribe$.complete();
  }
}
