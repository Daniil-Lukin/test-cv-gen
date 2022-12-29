import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { EmployeeDisplayComponent } from "./components/employee-display/employee-display.component";
import { EmployeesListComponent } from "./components/employees-list/employees-list.component";

const routes: Routes = [
  {
    path: '',
    component: EmployeesListComponent,
  },
  {
    path:':id',
    component: EmployeeDisplayComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmpolyeesRoutingModule {}