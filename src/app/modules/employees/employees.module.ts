import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';



@NgModule({
  declarations: [
    EmployeesListComponent
  ],
  imports: [
    CommonModule,
    NzTableModule,
  ]
})
export class EmployeesModule { }
