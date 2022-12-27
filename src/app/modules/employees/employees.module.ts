import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EmpolyeesRoutingModule } from './employees-routing.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    EmpolyeesRoutingModule,
    NzTableModule,
  ]
})
export class EmployeesModule { }
