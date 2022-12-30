import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CvsRoutingModule } from './cvs-routing.module';
import { CvEditComponent } from './components/cv-edit/cv-edit.component';




@NgModule({
  declarations: [
    CvEditComponent
  ],
  imports: [
    CommonModule,
    CvsRoutingModule
  ]
})
export class CvsModule { }
