import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as _ from 'lodash';
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[dgCheckbox]',
})
export class DataGridCheckboxDirective implements OnChanges {
  @Input() checked: boolean;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.checked) {
      console.log(this.el);
      if (this.checked) {
        this.renderer.setProperty(this.el.nativeElement, 'checked', true);
      } else {
        this.renderer.setProperty(this.el.nativeElement, 'checked', false);
      }
    }
  }
}
