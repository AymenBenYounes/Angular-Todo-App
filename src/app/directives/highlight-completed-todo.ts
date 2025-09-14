import { Directive, input, ElementRef, inject, effect, output } from '@angular/core';

@Directive({
  selector: '[appHighlightCompletedTodo]',
})
export class HighlightCompletedTodo {
  isCompleted = input(false);

  el = inject(ElementRef);
  styles = effect(() => {
    if (this.isCompleted()) {
      this.el.nativeElement.style.textDecoration = 'line-through';
      this.el.nativeElement.style.color = '#808080';
    } else {
      this.el.nativeElement.style.textDecoration = 'none';
      this.el.nativeElement.style.color = '#000';
    }
  });
}
