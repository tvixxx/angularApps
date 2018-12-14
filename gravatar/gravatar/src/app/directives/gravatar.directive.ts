import { Directive, OnInit, Input, ElementRef, Renderer2, Output, EventEmitter } from "@angular/core";
import { Md5 } from "ts-md5/dist/md5";

export const MAX_AVATAR_SIZE = 2048;
export const DEFAULT_AVATAR_SIZE = 80;

@Directive({
  selector: "[appGravatar]"
})
export class GravatarDirective implements OnInit {
  gravatarEmail: string = '';
  gravatarSize: number = DEFAULT_AVATAR_SIZE;
  defaultUrl: string = '//www.gravatar.com/avatar/';

  @Input()
  set email(email: string) {
    if (!email) {
      return;
    }

    this.gravatarEmail = email;
    this.updateGravatar(email, this.gravatarSize);
  }

  @Input()
  set size(size: string) {
    if (!size) {
      return;
    }

    if (size && parseInt(size, 10) < MAX_AVATAR_SIZE) {
      this.gravatarSize = parseInt(size, 10);
      this.updateGravatar(this.gravatarEmail, parseInt(size, 10));
    } else {
      this.gravatarSize = DEFAULT_AVATAR_SIZE;
      this.updateGravatar(this.gravatarEmail, DEFAULT_AVATAR_SIZE);
    }
  }

  @Output()
  isImageLoaded: EventEmitter<boolean> = new EventEmitter();

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit() {
    if (this.el) {
      this.renderer.setAttribute(this.el.nativeElement, "src", this.defaultUrl);
    }
  }

  loadImage(emailHash: string = '', size?: number) {
    this.updateNativeElemStyle(this.el, "opacity", 0.4);
    this.isImageLoaded.emit(false);

    const imageSrc = `${this.defaultUrl}${emailHash}?size=${size}`;
    const img = new Image();

    img.onload = () => {
      this.updateNativeElemStyle(this.el, "opacity", 1);
    };

    img.onerror = () => {
      console.error('Error!');
      this.isImageLoaded.emit(true);
    };

    setTimeout(() => {
      img.src = imageSrc;
      this.isImageLoaded.emit(true);
    }, 1000);

    this.renderer.setAttribute(
      this.el.nativeElement,
      "src",
      imageSrc
    );
  }

  updateGravatar(email: string, size?: number): void {
    if (!email || !this.el.nativeElement) {
      return;
    }

    const emailHash = Md5.hashStr(email.trim().toLowerCase());
    this.loadImage(emailHash, size);
  }

  updateNativeElemStyle(el: ElementRef, style: string, value: any): void {
    if (el) {
      this.renderer.setStyle(this.el.nativeElement, style, value);
    }
  }
}
