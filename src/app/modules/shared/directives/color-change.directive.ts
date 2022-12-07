import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appColorChange]'
})
export class ColorChangeDirective implements AfterViewInit {
  @Input() isLast: boolean;

  constructor(private el: ElementRef) {}

  ngAfterViewInit(): void {
    if(this.isLast) {
      this.el.nativeElement.style.color = "black";
    }
  }

}
