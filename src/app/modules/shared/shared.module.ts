import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { RouterModule } from '@angular/router';
import { ColorChangeDirective } from './directives/color-change.directive';




@NgModule({
  declarations: [BreadcrumbComponent, ColorChangeDirective],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [BreadcrumbComponent]
})
export class SharedModule { }
