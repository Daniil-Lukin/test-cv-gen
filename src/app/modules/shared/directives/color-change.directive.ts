import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColorChange]'
})
export class ColorChangeDirective implements AfterViewInit {
  @Input() arrayLength: number;
  @Input() index: number;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if(this.index === this.arrayLength - 1) {
      this.el.nativeElement.style.color = "black";
    }
  }

}
