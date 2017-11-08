import { Directive, ElementRef, Renderer2, Input, HostBinding, HostListener, OnInit } from '@angular/core';

@Directive({
  selector: '[appExpandDescription]'
})
export class ExpandDescriptionDirective implements OnInit {

  @Input()
  styles;

  maxHeight: string;
  overflow: string;

  // @HostBinding('class.overflowed') overflowed: boolean = true;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) {}

  @HostListener('mouseenter') onMouseEnter() {
    // this.overflowed = false;

    this.renderer.removeStyle(this.elementRef.nativeElement, 'max-height');
  }

  @HostListener('mouseleave') onMouseLeave() {
    // this.overflowed = true;

    this.renderer.setStyle(this.elementRef.nativeElement, 'max-height', this.maxHeight);
  }

  ngOnInit() {
    this.maxHeight = this.styles.maxHeight;
    this.overflow = this.styles.overflow;

    this.renderer.setStyle(this.elementRef.nativeElement, 'max-height', this.maxHeight);
    this.renderer.setStyle(this.elementRef.nativeElement, 'overflow', this.overflow);
  }
}