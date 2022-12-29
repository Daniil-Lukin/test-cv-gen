import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-employee-display',
  templateUrl: './employee-display.component.html',
  styleUrls: ['./employee-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeeDisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
