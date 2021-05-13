import { Directive, ElementRef, Renderer2, Input, OnChanges, SimpleChanges } from '@angular/core';

const DEFAULT_CHILD_SIZE = 25 + 3;
const DEFAULT_PADDING = 21;
const DEFAULT_MIN_WIDTH = 87;
@Directive({
  // tslint:disable-next-line:directive-selector
  selector: '[manipulationColumn]',
})
export class ManipulationColumnDirective implements OnChanges {
  @Input() number: number;
  constructor(private renderer: Renderer2, private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.number && this.number !== undefined && this.number !== null) {
      let width = this.number * DEFAULT_CHILD_SIZE + DEFAULT_PADDING;
      if (width < DEFAULT_MIN_WIDTH) { width = DEFAULT_MIN_WIDTH; }
      this.renderer.setStyle(this.el.nativeElement, 'width', `${width}px`);
    }
  }
}
