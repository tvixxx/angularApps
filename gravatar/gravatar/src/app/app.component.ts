import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  email: string;
  size: string;
  isImageLoaded: boolean = true;

  loadImageHandler(value: boolean): void {
    this.isImageLoaded = value;
  }
}
