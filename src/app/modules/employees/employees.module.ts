import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeesListComponent } from './components/employees-list/employees-list.component';
import { NzTableModule } from 'ng-zorro-antd/table';
import { EmpolyeesRoutingModule } from './employees-routing.module';
import { EmployeeDisplayComponent } from './components/employee-display/employee-display.component';
import { EmployeeEditComponent } from './components/employee-edit/employee-edit.component';
import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzFormModule } from 'ng-zorro-antd/form';
import { ReactiveFormsModule } from '@angular/forms';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { CvsModule } from '../CVs/cvs.module';
import { NzModalService } from 'ng-zorro-antd/modal';
import { TranslateModule } from '@ngx-translate/core';



@NgModule({
  declarations: [EmployeesListComponent, EmployeeDisplayComponent, EmployeeEditComponent],
  providers: [NzModalService],
  imports: [
    CommonModule,
    EmpolyeesRoutingModule,
    CvsModule,
    ReactiveFormsModule,
    NzTableModule,
    NzTabsModule,
    NzInputModule,
    NzFormModule,
    NzButtonModule,
    TranslateModule,
  ]
})
export class EmployeesModule { }
