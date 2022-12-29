import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { EmployeeTable } from '../../interfaces/employee-table';
import { PositionsToGet } from '../../interfaces/positions-to-get';
import { PositionToGetData } from '../../interfaces/positions-to-get-interfaces/position-to-get-data';
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
          return response.data.map((employee) => {
            return {
              id: String(employee.id),
              name: employee.attributes.name,
            }
          })
        })
      )
      .subscribe((employee) => {
        this.listOfData = employee;
        this.changeDetectorRef.markForCheck();
      });

  }
}
