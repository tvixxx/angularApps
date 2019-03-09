import { Component, Input } from '@angular/core';

@Component({
  selector: 'test',
  template: `{{ value }}`,
})
export class TestComponent {
  @Input() value: number;
}
