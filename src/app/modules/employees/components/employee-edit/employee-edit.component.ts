import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, Observable } from 'rxjs';
import { EmployeesService } from '../../services/employees.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EmployeeEditComponent implements OnInit {
  public employeeForm: FormGroup;
  private id = this.activatedRoute.snapshot.params['id'];

  constructor(
    private formBuilder: FormBuilder,
    private employeesService: EmployeesService,
    private activatedRoute: ActivatedRoute,
    private changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.employeeForm = this.formBuilder.group({
      name: [null, Validators.required],
    });
    if ((this.id != 'new')) {
      this.employeesService.getEmployeeHTTP(this.id).pipe(
        map((employee) => employee.data.attributes)
      ).subscribe((value) => {
        this.changeDetectorRef.markForCheck();
        this.employeeForm.patchValue(value);
      });
    }
  }

  public onSubmit() {
    this.employeeForm.markAllAsTouched();
    if (this.employeeForm.valid) {
      let observable: Observable<unknown>;
      if (this.id != 'new') {
        observable = this.employeesService.changeEmployeeHTTP(
          this.id,
          this.employeeForm.value
        );
      } else {
        observable = this.employeesService.createEmployeeHTTP(
          this.employeeForm.value
        );
      }
      observable.subscribe();
    }
  }
}
