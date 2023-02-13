import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { EmployeeTable } from '../../../../core/interfaces/employee-interfaces/employee-table';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employees-list',
  templateUrl: './employees-list.component.html',
  styleUrls: ['./employees-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeesListComponent implements OnInit {
  public listOfData: EmployeeTable[];

  constructor(private employeesService: EmployeesService, private changeDetectorRef: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.employeesService
      .getAllEmployeesHTTP().pipe(
        map((response) => {
          return response.map((employee) => {
            if(employee.firstName === null) {
              employee.firstName = 'Vasya';
            }
            if(employee.lastName === null) {
              employee.lastName = 'Pupkin';
            }
            return {
              id: String(employee.id),
              firstName: employee.firstName,
              lastName: employee.lastName,
              email: employee.email,
            }
          })
        })
      )
      .subscribe((employee) => {
        this.changeDetectorRef.markForCheck();
        this.listOfData = employee;
      });

  }
}
