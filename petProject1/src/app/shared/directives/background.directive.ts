import {Directive, ElementRef, HostListener, Input, Renderer2, HostBinding} from '@angular/core';

@Directive({
  selector: '[appBackground]'
})
export class BackgroundDirective {
  @HostBinding('class.blue') blueClass: boolean = false;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.elementRef.nativeElement, 'background-color', 'blue');
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.blueClass = true;
  }

  @HostListener('mouseleave') onMouseLeave() {
    this.blueClass = false;
  }
}
